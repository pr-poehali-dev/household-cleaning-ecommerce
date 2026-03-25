import { Page, Product } from "@/App";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  setPage: (p: Page) => void;
  addToCart: (p: Product) => void;
}

const features = [
  { icon: "Leaf",        title: "100% натуральный состав",  desc: "Только растительные компоненты" },
  { icon: "ShieldCheck", title: "Безопасно для детей",      desc: "Гипоаллергенные формулы" },
  { icon: "Recycle",     title: "Забота о природе",         desc: "Биоразлагаемый состав" },
  { icon: "Truck",       title: "Быстрая доставка",         desc: "1–2 дня или самовывоз" },
];

const marqueeItems = [
  "🌿 Натуральный состав",
  "♻️ Эко-упаковка",
  "🧴 Без фосфатов",
  "🐾 Cruelty-free",
  "💧 Биоразлагаемо",
  "🌱 Сертифицировано",
  "✨ Для всей семьи",
  "🍋 Растительные экстракты",
];

export default function HomePage({ setPage, addToCart }: HomePageProps) {
  const hits = products.slice(0, 4);

  return (
    <div className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden min-h-[92vh] flex items-center"
        style={{ background: "linear-gradient(160deg, hsl(105,40%,88%) 0%, hsl(50,45%,93%) 55%, hsl(32,55%,90%) 100%)" }}
      >
        {/* Floating decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          {/* Большой зелёный круг */}
          <div
            className="animate-float-a absolute w-80 h-80 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(110,50%,45%) 0%, transparent 70%)",
              top: "-60px", right: "5%",
              animationDelay: "0s",
            }}
          />
          {/* Тёплый апельсиновый круг */}
          <div
            className="animate-float-b absolute w-56 h-56 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, hsl(35,70%,65%) 0%, transparent 70%)",
              bottom: "10%", left: "3%",
              animationDelay: "2s",
            }}
          />
          {/* Маленький изумрудный */}
          <div
            className="animate-float-c absolute w-36 h-36 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(155,50%,50%) 0%, transparent 70%)",
              top: "30%", right: "22%",
              animationDelay: "1s",
            }}
          />

          {/* Листики */}
          <span
            className="animate-sway absolute text-5xl opacity-30 origin-bottom"
            style={{ bottom: "18%", right: "10%", animationDelay: "0.5s" }}
          >🌿</span>
          <span
            className="animate-sway absolute text-3xl opacity-20 origin-bottom"
            style={{ top: "22%", left: "8%", animationDelay: "1.2s" }}
          >🍃</span>
          <span
            className="animate-float-d absolute text-4xl opacity-25"
            style={{ top: "12%", right: "35%", animationDelay: "0.8s" }}
          >✨</span>

          {/* Поднимающиеся пузырьки */}
          {[
            { size: 18, left: "15%", delay: "0s",   dur: "8s"  },
            { size: 12, left: "35%", delay: "2.5s", dur: "6s"  },
            { size: 22, left: "65%", delay: "1s",   dur: "10s" },
            { size: 10, left: "80%", delay: "3.5s", dur: "7s"  },
            { size: 16, left: "50%", delay: "0.5s", dur: "9s"  },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/30 bg-primary/8"
              style={{
                width: b.size, height: b.size,
                left: b.left, bottom: "-30px",
                animation: `riseUp ${b.dur} ease-in-out ${b.delay} infinite`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 bg-white/60 backdrop-blur text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-primary/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
              Экологичная химия нового поколения
            </span>

            <h1 className="font-cormorant text-5xl md:text-7xl font-semibold text-foreground leading-[1.1] mb-6">
              Чистота дома —{" "}
              <span className="italic text-primary relative inline-block">
                в гармонии
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="hsl(35,60%,52%)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {" "}с природой
            </h1>

            <p className="text-foreground/60 text-lg mb-10 leading-relaxed max-w-md">
              Бытовая химия из растительных компонентов. Безопасна для всей семьи,
              бережна к окружающей среде.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPage("catalog")}
                className="group relative bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
              >
                Перейти в каталог
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setPage("delivery")}
                className="border-2 border-primary/30 text-primary px-7 py-3.5 rounded-full font-medium hover:border-primary hover:bg-primary/5 transition-all backdrop-blur"
              >
                Условия доставки
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-10">
              {[
                { val: "50+",    label: "Товаров" },
                { val: "15 000+", label: "Клиентов" },
                { val: "0%",     label: "Фосфатов" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-cormorant text-2xl font-semibold text-primary">{s.val}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + floating cards */}
          <div className="relative animate-fade-in hidden md:block">
            <div
              className="animate-float-a absolute inset-0 rounded-[2rem] opacity-15"
              style={{ background: "hsl(110,40%,55%)", animationDelay: "0.3s" }}
            />
            <img
              src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/525b731d-d316-4ee9-9dbf-59cea1bb9fc8.jpg"
              alt="Экологичная химия"
              className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]"
            />

            {/* Floating badge 1 */}
            <div
              className="animate-float-d absolute -left-8 top-1/3 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">🌿</div>
              <div>
                <p className="text-xs font-semibold">Без химикатов</p>
                <p className="text-[10px] text-muted-foreground">100% растительный состав</p>
              </div>
            </div>

            {/* Floating badge 2 */}
            <div
              className="animate-float-b absolute -right-6 bottom-1/4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-border"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">⭐</div>
              <div>
                <p className="text-xs font-semibold">4.9 / 5</p>
                <p className="text-[10px] text-muted-foreground">15 000+ отзывов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 text-sm font-medium opacity-90">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.icon}
              className="group relative overflow-hidden text-center p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* ripple on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at 50% 50%, hsl(110,35%,32%,0.06) 0%, transparent 70%)" }}
              />
              <div className="relative w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name={f.icon} size={24} className="text-primary" />
              </div>
              <h3 className="relative font-semibold text-sm mb-1">{f.title}</h3>
              <p className="relative text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HITS ═══ */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Выбор покупателей</p>
            <h2 className="font-cormorant text-4xl font-semibold">Популярные товары</h2>
          </div>
          <button
            onClick={() => setPage("catalog")}
            className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Весь каталог <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hits.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* ═══ АКЦИИ ═══ */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Только сейчас</p>
          <h2 className="font-cormorant text-4xl font-semibold">Акции и скидки</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Promo 1 — анимированный фон */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
            style={{ background: "linear-gradient(135deg, hsl(35,70%,50%) 0%, hsl(28,80%,62%) 100%)" }}>
            {/* движущиеся круги */}
            <div className="pointer-events-none absolute inset-0">
              <div className="animate-float-c absolute w-32 h-32 rounded-full bg-white/10 -top-6 -right-6" />
              <div className="animate-float-a absolute w-20 h-20 rounded-full bg-white/8 bottom-4 left-4"
                style={{ animationDelay: "1s" }} />
            </div>
            <div className="relative z-10">
              <span className="inline-block bg-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                До 31 марта
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">Весенняя уборка</h3>
              <p className="text-white/85 text-sm">Скидка 15% на все средства для уборки</p>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <button onClick={() => setPage("catalog")}
                className="mt-4 bg-white text-amber-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                Выбрать
              </button>
              <span className="text-white/25 font-cormorant text-8xl font-bold leading-none select-none">15%</span>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
            style={{ background: "linear-gradient(135deg, hsl(110,42%,25%) 0%, hsl(110,38%,42%) 100%)" }}>
            <div className="pointer-events-none absolute inset-0">
              <div className="animate-spin-slow absolute w-40 h-40 rounded-full border-[3px] border-white/10 -top-8 -right-8" />
              <div className="animate-spin-slow absolute w-24 h-24 rounded-full border-2 border-white/8 bottom-2 left-2"
                style={{ animationDirection: "reverse", animationDelay: "2s" }} />
            </div>
            <div className="relative z-10">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Постоянная акция
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">Набор для кухни</h3>
              <p className="text-white/85 text-sm">Средство для посуды + таблетки ПММ = −20%</p>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <button onClick={() => setPage("catalog")}
                className="mt-4 bg-white text-primary text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                Выбрать
              </button>
              <span className="text-white/20 font-cormorant text-8xl font-bold leading-none select-none">20%</span>
            </div>
          </div>

          {/* Promo 3 */}
          <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
            style={{ background: "linear-gradient(135deg, hsl(195,55%,35%) 0%, hsl(205,60%,52%) 100%)" }}>
            <div className="pointer-events-none absolute inset-0">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-ripple absolute rounded-full border border-white/20"
                  style={{
                    width: 80 + i * 40, height: 80 + i * 40,
                    bottom: -20 - i * 20, right: -20 - i * 20,
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Бесплатно
              </span>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">Доставка от 2 000 ₽</h3>
              <p className="text-white/85 text-sm">Закажите на сумму от 2 000 ₽ и доставим бесплатно</p>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <button onClick={() => setPage("delivery")}
                className="mt-4 bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
                Подробнее
              </button>
              <span className="text-4xl animate-float-d" style={{ animationDelay: "0.5s" }}>🚚</span>
            </div>
          </div>
        </div>

        {/* Промокод */}
        <div className="mt-4 bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl animate-sway origin-bottom inline-block">🎁</div>
            <div>
              <p className="font-semibold">Промокод на первый заказ</p>
              <p className="text-sm text-muted-foreground">Скидка 10% для новых покупателей</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary font-mono font-bold text-lg px-4 py-2 rounded-xl tracking-widest border border-primary/20">
              ECO10
            </span>
            <button onClick={() => setPage("catalog")}
              className="bg-primary text-primary-foreground text-sm px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium">
              В каталог
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="mx-4 mb-16 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(120deg, hsl(110,38%,24%) 0%, hsl(110,35%,38%) 100%)" }}>

        {/* анимированные декоры */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-spin-slow absolute w-64 h-64 rounded-full border-[2px] border-white/8 -top-16 -left-16" />
          <div className="animate-spin-slow absolute w-96 h-96 rounded-full border border-white/5 -bottom-20 -right-20"
            style={{ animationDirection: "reverse", animationDuration: "20s" }} />
          <span className="animate-float-a absolute text-6xl opacity-10 top-6 right-16">🌿</span>
          <span className="animate-sway absolute text-4xl opacity-10 bottom-8 left-12 origin-bottom">🍃</span>
        </div>

        <div className="relative z-10 px-8 md:px-14 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-cormorant text-3xl md:text-5xl font-semibold text-white mb-3">
              Первый заказ — со скидкой 10%
            </h2>
            <p className="text-white/65 mb-6 text-lg">
              Используйте промокод{" "}
              <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded-lg">ECO10</span>{" "}
              при оформлении
            </p>
            <button
              onClick={() => setPage("catalog")}
              className="bg-white text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-lg"
            >
              Выбрать товары
            </button>
          </div>
          <div className="flex justify-end">
            <img
              src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/24ac8a90-b42f-4946-a7cb-8d2e775dc566.jpg"
              alt="Акция"
              className="animate-float-d rounded-2xl w-full md:max-w-xs object-cover aspect-square opacity-90 shadow-2xl"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
