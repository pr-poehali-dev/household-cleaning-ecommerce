import { CartItem, Page } from "@/App";
import { User } from "@/components/AuthModal";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { api } from "@/api";

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  setPage: (p: Page) => void;
  user: User | null;
  onAuthClick: () => void;
}

export default function CartPage({ cart, updateQuantity, setPage, user, onAuthClick }: CartPageProps) {
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCost = delivery === "delivery" && total < 2000 ? 250 : 0;

  const placeOrder = async () => {
    setLoading(true);
    await api.createOrder({
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, volume: i.volume })),
      delivery_type: delivery,
      address,
      total: total + deliveryCost,
      promo,
    });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="text-6xl mb-4">🌿</div>
        <h2 className="font-cormorant text-3xl font-semibold mb-2">Заказ оформлен!</h2>
        <p className="text-muted-foreground mb-6">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setPage("catalog")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
            Продолжить покупки
          </button>
          {user && (
            <button onClick={() => setPage("profile")} className="border border-border px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors text-sm">
              Мои заказы
            </button>
          )}
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-cormorant text-3xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
        <button onClick={() => setPage("catalog")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-cormorant text-3xl sm:text-4xl font-semibold mb-6">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
              <img src={item.image} alt={item.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug line-clamp-2">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.volume}</p>
                <p className="font-cormorant text-lg font-semibold text-primary mt-0.5">{item.price} ₽</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Icon name="Minus" size={12} />
                </button>
                <span className="w-5 text-center font-medium text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Plus" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-2xl p-5 h-fit lg:sticky lg:top-20">
          <h2 className="font-semibold text-lg mb-5">Оформление заказа</h2>

          {/* Delivery type */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Способ получения</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDelivery("delivery")}
                className={`border rounded-xl p-3 text-sm text-center transition-colors ${
                  delivery === "delivery" ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-foreground/70"
                }`}
              >
                <Icon name="Truck" size={16} className="mx-auto mb-1" />
                Доставка
              </button>
              <button
                onClick={() => setDelivery("pickup")}
                className={`border rounded-xl p-3 text-sm text-center transition-colors ${
                  delivery === "pickup" ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-foreground/70"
                }`}
              >
                <Icon name="Store" size={16} className="mx-auto mb-1" />
                Самовывоз
              </button>
            </div>
          </div>

          {/* Address */}
          {delivery === "delivery" && (
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Адрес доставки</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица, дом, квартира"
                className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          )}

          {/* Promo */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-1.5 block">Промокод</label>
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value.toUpperCase())}
              placeholder="ECO10"
              className="w-full px-3 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
            />
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-foreground/70">
              <span>Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт)</span>
              <span>{total} ₽</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Доставка</span>
              <span>{deliveryCost === 0 ? <span className="text-primary font-medium">Бесплатно</span> : `${deliveryCost} ₽`}</span>
            </div>
            {delivery === "delivery" && total < 2000 && (
              <p className="text-xs text-muted-foreground">До бесплатной доставки: {2000 - total} ₽</p>
            )}
            <div className="pt-2 border-t border-border flex justify-between font-semibold text-base">
              <span>Итого</span>
              <span className="font-cormorant text-xl text-primary">{total + deliveryCost} ₽</span>
            </div>
          </div>

          {/* Auth hint */}
          {!user && (
            <div className="mb-4 bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-foreground/70">
              <button onClick={onAuthClick} className="text-primary font-medium underline">Войдите</button>, чтобы заказ сохранился в профиле
            </div>
          )}

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Оформляем..." : "Оформить заказ"}
          </button>
          <button onClick={() => setPage("catalog")} className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
}
