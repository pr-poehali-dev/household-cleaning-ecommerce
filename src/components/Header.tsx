import { useState } from "react";
import { Page } from "@/App";
import { User } from "@/components/AuthModal";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  page: Page;
  setPage: (p: Page) => void;
  cartCount: number;
  user: User | null;
  onAuthClick: () => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Главная", page: "home" },
  { label: "Каталог", page: "catalog" },
  { label: "Доставка", page: "delivery" },
  { label: "О нас", page: "about" },
  { label: "Контакты", page: "contacts" },
];

export default function Header({ page, setPage, cartCount, user, onAuthClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <button onClick={() => navigate("home")} className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌿</span>
            <span className="font-cormorant text-xl font-semibold text-primary leading-none">
              ЭкоЧистота
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  page === link.page ? "text-primary border-b-2 border-primary pb-0.5" : "text-foreground/70"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* User */}
            {user ? (
              <button
                onClick={() => navigate("profile")}
                className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                  page === "profile"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border border-border text-foreground/70 hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Icon name="User" size={14} />
                Войти
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => navigate("cart")}
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

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border hover:bg-muted transition-colors"
            >
              <span className={`block w-4 h-0.5 bg-foreground transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-4 h-0.5 bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-foreground transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-xl animate-slide-up">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                    page === link.page ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 border-t border-border mt-2">
                {user ? (
                  <button
                    onClick={() => navigate("profile")}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-foreground/70 hover:bg-muted"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    Профиль — {user.name}
                  </button>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); onAuthClick(); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-foreground/70 hover:bg-muted"
                  >
                    <Icon name="User" size={16} />
                    Войти / Зарегистрироваться
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
