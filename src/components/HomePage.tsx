import { Page, Product } from "@/App";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  setPage: (p: Page) => void;
  addToCart: (p: Product) => void;
}

const features = [
  { icon: "Leaf", title: "100% натуральный состав", desc: "Только растительные компоненты без агрессивной химии" },
  { icon: "ShieldCheck", title: "Безопасно для детей", desc: "Гипоаллергенные формулы, проверенные дерматологами" },
  { icon: "Recycle", title: "Забота о природе", desc: "Биоразлагаемый состав и перерабатываемая упаковка" },
  { icon: "Truck", title: "Быстрая доставка", desc: "До двери за 1–2 дня или самовывоз в день заказа" },
];

export default function HomePage({ setPage, addToCart }: HomePageProps) {
  const hits = products.filter((p) => p.badge === "Хит" || p.badge === "Новинка").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(100,30%,92%) 0%, hsl(45,40%,94%) 50%, hsl(35,50%,92%) 100%)" }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-up">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              🌿 Экологичная химия
            </span>
            <h1 className="font-cormorant text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-4">
              Чистота дома — <br />
              <span className="text-primary italic">в гармонии с природой</span>
            </h1>
            <p className="text-foreground/65 text-lg mb-8 leading-relaxed max-w-md">
              Бытовая химия из натуральных компонентов. Безопасна для всей семьи, 
              бережна к окружающей среде.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Перейти в каталог
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => setPage("delivery")}
                className="border border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/5 transition-colors"
              >
                Условия доставки
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-3" />
            <img
              src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/525b731d-d316-4ee9-9dbf-59cea1bb9fc8.jpg"
              alt="Экологичная химия"
              className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.icon} className="text-center p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={f.icon} size={22} className="text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hits */}
      <section className="container mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cormorant text-3xl font-semibold">Популярные товары</h2>
            <p className="text-muted-foreground text-sm mt-1">Выбор наших покупателей</p>
          </div>
          <button
            onClick={() => setPage("catalog")}
            className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Все товары <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hits.length > 0
            ? hits.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)
            : products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)
          }
        </div>
      </section>

      {/* Promotions */}
      <section className="container mx-auto px-4 pb-14">
        <div className="mb-8">
          <h2 className="font-cormorant text-3xl font-semibold">Акции и скидки</h2>
          <p className="text-muted-foreground text-sm mt-1">Актуальные предложения этого месяца</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Promo 1 */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
            style={{ background: "linear-gradient(135deg, hsl(35,70%,55%) 0%, hsl(30,80%,65%) 100%)" }}>
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                До 31 марта
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white leading-tight mb-2">
                Весенняя уборка
              </h3>
              <p className="text-white/80 text-sm">Скидка 15% на все средства для уборки</p>
            </div>
            <div className="flex items-end justify-between">
              <button
                onClick={() => setPage("catalog")}
                className="mt-4 bg-white text-amber-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Выбрать
              </button>
              <span className="text-white/30 font-cormorant text-7xl font-bold leading-none select-none">
                15%
              </span>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
            style={{ background: "linear-gradient(135deg, hsl(110,40%,30%) 0%, hsl(110,35%,45%) 100%)" }}>
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                Постоянная акция
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white leading-tight mb-2">
                Набор для кухни
              </h3>
              <p className="text-white/80 text-sm">Средство для посуды + таблетки ПММ = −20%</p>
            </div>
            <div className="flex items-end justify-between">
              <button
                onClick={() => setPage("catalog")}
                className="mt-4 bg-white text-primary text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Выбрать
              </button>
              <span className="text-white/20 font-cormorant text-7xl font-bold leading-none select-none">
                20%
              </span>
            </div>
          </div>

          {/* Promo 3 */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[200px]"
            style={{ background: "linear-gradient(135deg, hsl(200,50%,40%) 0%, hsl(210,55%,55%) 100%)" }}>
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                Бесплатно
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white leading-tight mb-2">
                Доставка от 2 000 ₽
              </h3>
              <p className="text-white/80 text-sm">Закажите на сумму от 2 000 ₽ и доставим бесплатно</p>
            </div>
            <div className="flex items-end justify-between">
              <button
                onClick={() => setPage("delivery")}
                className="mt-4 bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Подробнее
              </button>
              <span className="text-5xl leading-none select-none">🚚</span>
            </div>
          </div>
        </div>

        {/* Countdown promo */}
        <div className="mt-4 bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🎁</div>
            <div>
              <p className="font-semibold">Промокод на первый заказ</p>
              <p className="text-sm text-muted-foreground">Скидка 10% для новых покупателей</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary font-mono font-bold text-lg px-4 py-2 rounded-xl tracking-widest">
              ECO10
            </span>
            <button
              onClick={() => setPage("catalog")}
              className="bg-primary text-primary-foreground text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Применить
            </button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="mx-4 mb-14 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(120deg, hsl(110,35%,28%) 0%, hsl(110,35%,40%) 100%)" }}>
        <div className="relative z-10 px-8 md:px-14 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-white mb-3">
              Первый заказ — со скидкой 10%
            </h2>
            <p className="text-white/70 mb-6">
              Используйте промокод <span className="text-white font-semibold">ECO10</span> при оформлении заказа
            </p>
            <button
              onClick={() => setPage("catalog")}
              className="bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Выбрать товары
            </button>
          </div>
          <div className="flex justify-end">
            <img
              src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/24ac8a90-b42f-4946-a7cb-8d2e775dc566.jpg"
              alt="Акция"
              className="rounded-2xl w-full md:max-w-xs object-cover aspect-square opacity-90"
            />
          </div>
        </div>
      </section>
    </div>
  );
}