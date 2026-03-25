import { CartItem, Page } from "@/App";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  setPage: (p: Page) => void;
}

export default function CartPage({ cart, updateQuantity, setPage }: CartPageProps) {
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCost = delivery === "delivery" && total < 2000 ? 250 : 0;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-cormorant text-3xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
        <button
          onClick={() => setPage("catalog")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-cormorant text-4xl font-semibold mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.volume}</p>
                <p className="font-cormorant text-lg font-semibold text-primary mt-1">{item.price} ₽</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Icon name="Minus" size={12} />
                </button>
                <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
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
        <div className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-20">
          <h2 className="font-semibold text-lg mb-5">Оформление заказа</h2>

          {/* Delivery type */}
          <div className="mb-5">
            <p className="text-sm text-muted-foreground mb-2">Способ получения</p>
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

          {/* Totals */}
          <div className="space-y-2 text-sm mb-5">
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

          <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Оформить заказ
          </button>
          <button
            onClick={() => setPage("catalog")}
            className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
}
