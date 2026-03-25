import { useEffect, useState } from "react";
import { api } from "@/api";
import { User } from "@/components/AuthModal";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface ProfilePageProps {
  user: User;
  setUser: (u: User) => void;
  onLogout: () => void;
  setPage: (p: Page) => void;
}

interface Order {
  id: number;
  status: string;
  delivery_type: string;
  address: string;
  total: number;
  promo: string;
  created_at: string;
  items: { name: string; price: number; quantity: number; volume: string }[];
}

const statusLabel: Record<string, { text: string; color: string }> = {
  new: { text: "Новый", color: "bg-blue-100 text-blue-700" },
  processing: { text: "В обработке", color: "bg-amber-100 text-amber-700" },
  delivering: { text: "Доставляется", color: "bg-purple-100 text-purple-700" },
  done: { text: "Выполнен", color: "bg-green-100 text-green-700" },
  cancelled: { text: "Отменён", color: "bg-red-100 text-red-700" },
};

export default function ProfilePage({ user, setUser, onLogout, setPage }: ProfilePageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [tab, setTab] = useState<"orders" | "settings">("orders");
  const [form, setForm] = useState({ name: user.name, phone: user.phone || "" });
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api.getOrders().then((data) => {
      setOrders(data.orders || []);
      setLoadingOrders(false);
    });
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = await api.updateMe({ name: form.name, phone: form.phone });
    if (data.user) {
      setUser(data.user);
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    }
    setSaving(false);
  };

  const fmt = (iso: string) => new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Profile header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-cormorant font-semibold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-cormorant text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl px-3 py-2 transition-colors"
        >
          <Icon name="LogOut" size={14} />
          <span className="hidden sm:inline">Выйти</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-muted rounded-xl p-1 mb-6">
        {([["orders", "Мои заказы"], ["settings", "Настройки"]] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {tab === "orders" && (
        <div>
          {loadingOrders ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📦</div>
              <h3 className="font-cormorant text-2xl font-semibold mb-2">Заказов пока нет</h3>
              <p className="text-muted-foreground mb-6 text-sm">Перейдите в каталог и сделайте первый заказ</p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                В каталог
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const st = statusLabel[order.status] || { text: order.status, color: "bg-gray-100 text-gray-600" };
                const isOpen = expanded === order.id;
                return (
                  <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <button
                      className="w-full text-left p-4 flex items-center gap-4"
                      onClick={() => setExpanded(isOpen ? null : order.id)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name="Package" size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-medium text-sm">Заказ №{order.id}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>{st.text}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{fmt(order.created_at)} · {order.items.length} товар(а) · {order.total} ₽</p>
                      </div>
                      <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground shrink-0" />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border px-4 pb-4 pt-3">
                        <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                          <span>📍 {order.delivery_type === "pickup" ? "Самовывоз" : order.address || "Доставка"}</span>
                          {order.promo && <span>🎁 Промокод: {order.promo}</span>}
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-foreground/70">{item.name} <span className="text-muted-foreground text-xs">× {item.quantity}</span></span>
                              <span className="font-medium">{item.price * item.quantity} ₽</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border flex justify-between font-semibold text-sm">
                          <span>Итого</span>
                          <span className="text-primary font-cormorant text-lg">{order.total} ₽</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-5">Личные данные</h2>
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Телефон</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7 (900) 000-00-00"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 border border-border rounded-xl bg-muted text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
            {savedOk && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                ✓ Данные сохранены
              </div>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
