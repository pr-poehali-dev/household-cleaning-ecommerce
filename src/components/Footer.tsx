import { Page } from "@/App";

interface FooterProps {
  setPage: (p: Page) => void;
}

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="font-cormorant text-xl font-semibold">ЭкоЧистота</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Натуральная бытовая химия для вашего дома. Безопасно для семьи, бережно к природе.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Навигация</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                { label: "Каталог", page: "catalog" as Page },
                { label: "Доставка", page: "delivery" as Page },
                { label: "О нас", page: "about" as Page },
                { label: "Контакты", page: "contacts" as Page },
              ].map((l) => (
                <li key={l.page}>
                  <button onClick={() => setPage(l.page)} className="hover:text-primary-foreground transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Контакты</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>📞 +7 (900) 000-00-00</li>
              <li>✉️ hello@ecoclean.ru</li>
              <li>📍 Москва, ул. Экологическая, 1</li>
              <li>⏰ Пн–Пт 9:00–19:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/50">
          © 2026 ЭкоЧистота — все права защищены
        </div>
      </div>
    </footer>
  );
}
