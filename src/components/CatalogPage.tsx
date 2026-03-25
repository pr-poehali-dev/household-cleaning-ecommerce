import { useState } from "react";
import { Product } from "@/App";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

interface CatalogPageProps {
  addToCart: (p: Product) => void;
}

const categories = ["Все", "посуда", "стирка", "уборка", "ванная"];
const purposes = ["Все", "кухня", "одежда", "дом", "ванная"];
const safetyOptions = [
  { value: "all", label: "Все" },
  { value: "safe", label: "Безопасно" },
  { value: "eco", label: "Эко" },
  { value: "hypo", label: "Гипоаллергенно" },
];

export default function CatalogPage({ addToCart }: CatalogPageProps) {
  const [category, setCategory] = useState("Все");
  const [purpose, setPurpose] = useState("Все");
  const [safety, setSafety] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const catMatch = category === "Все" || p.category === category;
    const purposeMatch = purpose === "Все" || p.purpose === purpose;
    const safetyMatch = safety === "all" || p.safety === safety;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && purposeMatch && safetyMatch && searchMatch;
  });

  const resetFilters = () => {
    setCategory("Все");
    setPurpose("Все");
    setSafety("all");
    setSearch("");
  };

  const hasFilters = category !== "Все" || purpose !== "Все" || safety !== "all" || search !== "";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-cormorant text-4xl font-semibold mb-2">Каталог товаров</h1>
        <p className="text-muted-foreground">Натуральная бытовая химия — {products.length} позиций</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
        />
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={16} className="text-primary" />
            Фильтры
          </h2>
          {hasFilters && (
            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
              <Icon name="X" size={12} />
              Сбросить
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Тип средства</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {c === "Все" ? c : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Назначение</p>
            <div className="flex flex-wrap gap-2">
              {purposes.map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    purpose === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {p === "Все" ? p : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Безопасность</p>
            <div className="flex flex-wrap gap-2">
              {safetyOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSafety(s.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    safety === s.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="PackageSearch" size={40} className="mx-auto mb-4 opacity-40" />
          <p className="font-medium">Товаров не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">Найдено: {filtered.length} товаров</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
