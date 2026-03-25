import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-3">Контакты</h1>
        <p className="text-muted-foreground text-lg">Свяжитесь с нами — ответим в течение часа</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div>
          <div className="space-y-4 mb-8">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
              { icon: "Mail", label: "Email", value: "hello@ecoclean.ru" },
              { icon: "MapPin", label: "Адрес", value: "Москва, ул. Экологическая, 1" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–19:00, Сб 10:00–17:00" },
            ].map((c) => (
              <div key={c.icon} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-medium text-sm mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm">
            <p className="font-semibold mb-1">💬 Также в мессенджерах</p>
            <p className="text-foreground/70">WhatsApp, Telegram: +7 (900) 000-00-00</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-7">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">🌿</div>
              <h3 className="font-cormorant text-2xl font-semibold mb-2">Сообщение отправлено!</h3>
              <p className="text-muted-foreground text-sm">Мы ответим вам в течение часа.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-5 text-primary text-sm underline"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-lg mb-5">Написать нам</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@mail.ru"
                    className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ваш вопрос..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Отправить сообщение
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
