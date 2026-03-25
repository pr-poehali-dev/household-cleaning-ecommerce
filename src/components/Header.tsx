import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Главная", page: "home" },
  { label: "Каталог", page: "catalog" },
  { label: "Доставка", page: "delivery" },
  { label: "О нас", page: "about" },
  { label: "Контакты", page: "contacts" },
];

export default function Header({ page, setPage, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-2xl">🌿</span>
          <span className="font-cormorant text-xl font-semibold text-primary leading-none">
            ЭкоЧистота
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => setPage(link.page)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                page === link.page ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground/70"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setPage("cart")}
          className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Icon name="ShoppingCart" size={16} />
          <span className="hidden sm:inline">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <nav className="md:hidden border-t border-border overflow-x-auto">
        <div className="flex px-4 py-2 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => setPage(link.page)}
              className={`text-xs whitespace-nowrap font-medium transition-colors ${
                page === link.page ? "text-primary" : "text-foreground/60"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
