export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-12">
        <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-3">О нас</h1>
        <p className="text-muted-foreground text-lg">Наша история и ценности</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <h2 className="font-cormorant text-3xl font-semibold mb-4">Мы верим в чистоту без компромиссов</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            ЭкоЧистота — это команда людей, которые устали от агрессивной химии в составе обычных моющих средств. 
            Мы начали в 2020 году с небольшой лаборатории и рецептов на растительной основе.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Сегодня наши продукты используют тысячи семей по всей России. Каждое средство проходит 
            дерматологическую проверку и сертификацию по стандартам ЕС.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/50c71b27-f97d-412b-a2c3-404cdaebe3d1/files/525b731d-d316-4ee9-9dbf-59cea1bb9fc8.jpg"
            alt="О нас"
            className="w-full object-cover aspect-[4/3]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { num: "2020", label: "Год основания" },
          { num: "50+", label: "Наименований" },
          { num: "15 000+", label: "Довольных клиентов" },
          { num: "0%", label: "Фосфатов в составе" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="font-cormorant text-3xl font-semibold text-primary">{s.num}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
        <h2 className="font-cormorant text-2xl font-semibold mb-5">Наши принципы</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🌱", title: "Только натуральное", desc: "Все ингредиенты растительного происхождения. Никаких синтетических красителей и ароматизаторов." },
            { icon: "♻️", title: "Экоупаковка", desc: "Флаконы из вторично переработанного пластика или стекла. Минимум отходов." },
            { icon: "🐾", title: "Без тестов на животных", desc: "Все продукты протестированы только на людях-добровольцах. Cruelty-free сертификат." },
          ].map((p) => (
            <div key={p.title}>
              <div className="text-3xl mb-2">{p.icon}</div>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
