import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { val, ref };
}

function AnimStat({ num, suffix = "", label }: { num: number; suffix?: string; label: string }) {
  const { val, ref } = useCountUp(num);
  return (
    <div ref={ref} className="text-center">
      <p className="font-cormorant text-4xl md:text-5xl font-semibold text-primary">
        {val.toLocaleString("ru")}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

const timeline = [
  { year: "2020", icon: "🌱", title: "Основание", desc: "Команда из 3 человек и первая партия эко-средств" },
  { year: "2021", icon: "🧪", title: "Лаборатория", desc: "Открыли собственную лабораторию и получили первые сертификаты" },
  { year: "2022", icon: "🚀", title: "Рост", desc: "Запуск интернет-магазина, 5 000 первых клиентов" },
  { year: "2023", icon: "🏆", title: "Признание", desc: "Премия «Лучший эко-продукт» на выставке ExpoClean" },
  { year: "2024", icon: "🌍", title: "Масштаб", desc: "Доставка по всей России, 15 000+ постоянных покупателей" },
  { year: "2026", icon: "✨", title: "Сегодня", desc: "50+ наименований и новая линейка для бизнеса" },
];

const ingredients = [
  { icon: "🍋", name: "Лимонная кислота", pct: 82, desc: "Растворяет известковый налёт" },
  { icon: "🌿", name: "Экстракт эвкалипта", pct: 76, desc: "Антибактериальный эффект" },
  { icon: "🧴", name: "Глицерин", pct: 90, desc: "Защита кожи рук" },
  { icon: "🌾", name: "Пшеничный крахмал", pct: 68, desc: "Загуститель на растительной основе" },
];

const values = [
  { icon: "Leaf", color: "bg-green-100 text-green-700", title: "100% натуральный состав", desc: "Только растительные компоненты без синтетических красителей и ароматизаторов." },
  { icon: "Recycle", color: "bg-emerald-100 text-emerald-700", title: "Экологичная упаковка", desc: "Флаконы из переработанного пластика или стекла. Минимум отходов." },
  { icon: "Heart", color: "bg-pink-100 text-pink-700", title: "Cruelty-free", desc: "Тесты только с добровольцами-людьми. Сертифицировано PETA." },
  { icon: "ShieldCheck", color: "bg-blue-100 text-blue-700", title: "Дерматологически проверено", desc: "Каждый продукт прошёл клинические тесты на коже разных типов." },
  { icon: "Award", color: "bg-amber-100 text-amber-700", title: "Сертификаты ЕС", desc: "Соответствует стандартам ECOCERT и EU Ecolabel." },
  { icon: "Users", color: "bg-violet-100 text-violet-700", title: "Прозрачный состав", desc: "Полный список ингредиентов на каждой упаковке без скрытых компонентов." },
];

function ProgressBar({ pct }: { pct: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setW(pct), 100); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(105,35%,88%) 0%, hsl(45,40%,94%) 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-a absolute w-64 h-64 rounded-full opacity-20 -top-10 -right-10"
            style={{ background: "radial-gradient(circle, hsl(110,50%,45%), transparent 70%)" }} />
          <span className="animate-sway absolute text-5xl opacity-20 bottom-8 left-8 origin-bottom">🌿</span>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🌱 Наша история
          </span>
          <h1 className="font-cormorant text-4xl md:text-6xl font-semibold mb-4">
            Мы верим в чистоту<br />
            <span className="text-primary italic">без компромиссов</span>
          </h1>
          <p className="text-foreground/65 text-lg leading-relaxed">
            ЭкоЧистота — команда людей, которые устали от агрессивной химии.
            С 2020 года мы создаём средства, которые заботятся о семье и планете.
          </p>
        </div>
      </section>

      {/* Animated stats */}
      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <AnimStat num={2020} label="Год основания" />
          <AnimStat num={50} suffix="+" label="Наименований" />
          <AnimStat num={15000} suffix="+" label="Клиентов" />
          <AnimStat num={0} suffix="%" label="Фосфатов в составе" />
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 pb-16 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">Путь компании</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold">Как мы росли</h2>
        </div>

        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={item.year} className={`relative flex gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-5 z-10" />

                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-md transition-all ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-primary">{item.year}</span>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients infographic */}
      <section className="bg-card border-y border-border py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">Что внутри</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-semibold">Ключевые ингредиенты</h2>
            <p className="text-muted-foreground text-sm mt-2">Доля натурального происхождения в составе каждого типа средств</p>
          </div>
          <div className="space-y-6">
            {ingredients.map((ing) => (
              <div key={ing.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ing.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{ing.name}</p>
                      <p className="text-xs text-muted-foreground">{ing.desc}</p>
                    </div>
                  </div>
                  <span className="font-cormorant text-2xl font-semibold text-primary ml-4">{ing.pct}%</span>
                </div>
                <ProgressBar pct={ing.pct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-14 max-w-4xl">
        <div className="text-center mb-10">
          <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">Ценности</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold">Наши принципы</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${v.color}`}>
                <Icon name={v.icon} size={20} />
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team photo */}
      <section className="container mx-auto px-4 pb-14 max-w-4xl">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/525b731d-d316-4ee9-9dbf-59cea1bb9fc8.jpg"
            alt="Производство"
            className="w-full object-cover aspect-[21/9] brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <p className="font-cormorant text-3xl md:text-5xl font-semibold text-white mb-3">
                Сделано с заботой о вас
              </p>
              <p className="text-white/70 text-sm md:text-base max-w-md mx-auto">
                Каждая формула создаётся нашими технологами с любовью к природе и уважением к вашей семье.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
