import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import CatalogPage from "@/components/CatalogPage";
import CartPage from "@/components/CartPage";
import AboutPage from "@/components/AboutPage";
import DeliveryPage from "@/components/DeliveryPage";
import ContactsPage from "@/components/ContactsPage";
import ProfilePage from "@/components/ProfilePage";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { User } from "@/components/AuthModal";
import { api } from "@/api";

export type Page = "home" | "catalog" | "cart" | "about" | "delivery" | "contacts" | "profile";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  volume: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  purpose: string;
  safety: "safe" | "eco" | "hypo";
  volume: string;
  badge?: string;
  description: string;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("eco_token");
    if (token) {
      api.getMe().then((data) => {
        if (data.user) setUser(data.user);
      });
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image, volume: product.volume }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("eco_token");
    setUser(null);
    setPage("home");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col font-golos">
      <Header
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        user={user}
        onAuthClick={() => setShowAuth(true)}
      />
      <main className="flex-1">
        {page === "home" && <HomePage setPage={setPage} addToCart={addToCart} />}
        {page === "catalog" && <CatalogPage addToCart={addToCart} />}
        {page === "cart" && (
          <CartPage
            cart={cart}
            updateQuantity={updateQuantity}
            setPage={setPage}
            user={user}
            onAuthClick={() => setShowAuth(true)}
          />
        )}
        {page === "about" && <AboutPage />}
        {page === "delivery" && <DeliveryPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "profile" && user && (
          <ProfilePage
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            setPage={setPage}
          />
        )}
      </main>
      <Footer setPage={setPage} />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={(u) => { setUser(u); }}
        />
      )}
    </div>
  );
}
