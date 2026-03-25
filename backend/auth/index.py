"""
Аутентификация: register, login, me (get/update). Action передаётся в поле body.action.
"""
import json
import os
import hashlib
import hmac
import secrets
import psycopg2

SCHEMA = "t_p55225895_household_cleaning_e"
SECRET = os.environ.get("JWT_SECRET", "eco_secret_key_2026")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256((password + SECRET).encode()).hexdigest()


def make_token(user_id: int) -> str:
    rand = secrets.token_hex(16)
    sig = hmac.new(SECRET.encode(), f"{user_id}:{rand}".encode(), hashlib.sha256).hexdigest()
    return f"{user_id}:{rand}:{sig}"


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


def r(status: int, body: dict) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(body, ensure_ascii=False)}


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

    token = (event.get("headers") or {}).get("X-Session-Token", "")
    action = body.get("action", "")

    # GET — получить профиль
    if method == "GET":
        user_id = verify_token(token)
        if not user_id:
            return r(401, {"error": "Не авторизован"})
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, email, name, phone FROM {SCHEMA}.users WHERE id = %s", (user_id,))
        row = cur.fetchone()
        conn.close()
        if not row:
            return r(404, {"error": "Пользователь не найден"})
        return r(200, {"user": {"id": row[0], "email": row[1], "name": row[2], "phone": row[3]}})

    if method == "POST":
        # Регистрация
        if action == "register":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""
            name = (body.get("name") or "").strip()
            if not email or not password or not name:
                return r(400, {"error": "Заполните все поля"})
            if len(password) < 6:
                return r(400, {"error": "Пароль минимум 6 символов"})
            pw_hash = hash_password(password)
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
            if cur.fetchone():
                conn.close()
                return r(409, {"error": "Email уже зарегистрирован"})
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id",
                (email, pw_hash, name)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            conn.close()
            return r(200, {"token": make_token(user_id), "user": {"id": user_id, "email": email, "name": name, "phone": None}})

        # Вход
        if action == "login":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""
            if not email or not password:
                return r(400, {"error": "Введите email и пароль"})
            pw_hash = hash_password(password)
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(
                f"SELECT id, name, phone FROM {SCHEMA}.users WHERE email = %s AND password_hash = %s",
                (email, pw_hash)
            )
            row = cur.fetchone()
            conn.close()
            if not row:
                return r(401, {"error": "Неверный email или пароль"})
            return r(200, {"token": make_token(row[0]), "user": {"id": row[0], "email": email, "name": row[1], "phone": row[2]}})

        # Обновить профиль
        if action == "update":
            user_id = verify_token(token)
            if not user_id:
                return r(401, {"error": "Не авторизован"})
            name = body.get("name")
            phone = body.get("phone")
            conn = get_conn()
            cur = conn.cursor()
            if name:
                cur.execute(f"UPDATE {SCHEMA}.users SET name = %s WHERE id = %s", (name, user_id))
            if phone is not None:
                cur.execute(f"UPDATE {SCHEMA}.users SET phone = %s WHERE id = %s", (phone, user_id))
            conn.commit()
            cur.execute(f"SELECT id, email, name, phone FROM {SCHEMA}.users WHERE id = %s", (user_id,))
            row = cur.fetchone()
            conn.close()
            return r(200, {"user": {"id": row[0], "email": row[1], "name": row[2], "phone": row[3]}})

    return r(404, {"error": "Not found"})
