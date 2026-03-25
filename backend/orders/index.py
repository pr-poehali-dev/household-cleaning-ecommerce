"""
Заказы: создание заказа и получение истории заказов пользователя.
"""
import json
import os
import hashlib
import hmac
import psycopg2

SCHEMA = "t_p55225895_household_cleaning_e"
SECRET = os.environ.get("JWT_SECRET", "eco_secret_key_2026")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def verify_token(token: str):
    try:
        parts = token.split(":")
        if len(parts) != 3:
            return None
        user_id, rand, sig = parts
        expected = hmac.new(SECRET.encode(), f"{user_id}:{rand}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return None
        return int(user_id)
    except Exception:
        return None


def resp(status: int, body: dict) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(body, ensure_ascii=False, default=str)}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    body = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            pass

    token = event.get("headers", {}).get("X-Session-Token", "")
    user_id = verify_token(token)

    # POST / — создать заказ
    if method == "POST":
        items = body.get("items", [])
        delivery_type = body.get("delivery_type", "delivery")
        address = body.get("address", "")
        promo = body.get("promo", "")
        total = body.get("total", 0)

        if not items:
            return resp(400, {"error": "Корзина пуста"})

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.orders (user_id, status, delivery_type, address, total, promo) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (user_id, "new", delivery_type, address, total, promo)
        )
        order_id = cur.fetchone()[0]
        for item in items:
            cur.execute(
                f"INSERT INTO {SCHEMA}.order_items (order_id, product_id, name, price, quantity, volume) VALUES (%s, %s, %s, %s, %s, %s)",
                (order_id, item.get("id", 0), item.get("name", ""), item.get("price", 0), item.get("quantity", 1), item.get("volume", ""))
            )
        conn.commit()
        conn.close()
        return resp(200, {"order_id": order_id, "status": "new"})

    # GET / — история заказов
    if method == "GET":
        if not user_id:
            return resp(401, {"error": "Не авторизован"})
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, status, delivery_type, address, total, promo, created_at FROM {SCHEMA}.orders WHERE user_id = %s ORDER BY created_at DESC",
            (user_id,)
        )
        orders = []
        for row in cur.fetchall():
            oid = row[0]
            cur2 = conn.cursor()
            cur2.execute(f"SELECT product_id, name, price, quantity, volume FROM {SCHEMA}.order_items WHERE order_id = %s", (oid,))
            items_rows = cur2.fetchall()
            orders.append({
                "id": oid,
                "status": row[1],
                "delivery_type": row[2],
                "address": row[3],
                "total": row[4],
                "promo": row[5],
                "created_at": str(row[6]),
                "items": [{"product_id": r[0], "name": r[1], "price": r[2], "quantity": r[3], "volume": r[4]} for r in items_rows]
            })
        conn.close()
        return resp(200, {"orders": orders})

    return resp(404, {"error": "Not found"})
