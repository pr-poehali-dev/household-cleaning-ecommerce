import Icon from "@/components/ui/icon";

export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-3">Доставка и самовывоз</h1>
        <p className="text-muted-foreground text-lg">Удобные варианты получения заказа</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Delivery */}
        <div className="bg-card border border-border rounded-2xl p-7">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
            <Icon name="Truck" size={22} className="text-primary" />
          </div>
          <h2 className="font-cormorant text-2xl font-semibold mb-3">Доставка курьером</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>По Москве — <strong className="text-foreground">1–2 дня</strong> от 250 ₽</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>По России — <strong className="text-foreground">3–7 дней</strong> (СДЭК, Почта России)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Бесплатно при заказе от <strong className="text-foreground">2 000 ₽</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Доставка в удобный интервал — утро, день, вечер</span>
            </li>
          </ul>
        </div>

        {/* Pickup */}
        <div className="bg-card border border-border rounded-2xl p-7">
          <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center mb-5">
            <Icon name="Store" size={22} className="text-accent" />
          </div>
          <h2 className="font-cormorant text-2xl font-semibold mb-3">Самовывоз</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span><strong className="text-foreground">Бесплатно</strong> — без минимальной суммы</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Готовность заказа — <strong className="text-foreground">в день оформления</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Адрес: Москва, ул. Экологическая, 1</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Режим работы: <strong className="text-foreground">Пн–Пт 9:00–19:00</strong>, Сб 10:00–17:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pricing table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Стоимость доставки по Москве</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { range: "До 1 000 ₽", price: "350 ₽", period: "1–2 дня" },
            { range: "1 000 — 2 000 ₽", price: "250 ₽", period: "1–2 дня" },
            { range: "От 2 000 ₽", price: "Бесплатно", period: "1–2 дня", highlight: true },
          ].map((row) => (
            <div key={row.range} className={`grid grid-cols-3 px-5 py-4 text-sm ${row.highlight ? "bg-primary/5" : ""}`}>
              <span className="text-foreground/70">{row.range}</span>
              <span className={`font-medium ${row.highlight ? "text-primary" : ""}`}>{row.price}</span>
              <span className="text-foreground/60">{row.period}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
        <p className="font-semibold mb-1">📦 Как мы упаковываем</p>
        <p>Используем только перерабатываемую бумажную упаковку и биоразлагаемые наполнители. 
        Пластика в упаковке нет.</p>
      </div>
    </div>
  );
}
