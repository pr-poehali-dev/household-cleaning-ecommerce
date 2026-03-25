import { Product } from "@/App";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const safetyLabels: Record<Product["safety"], { label: string; color: string }> = {
  safe: { label: "Безопасно", color: "bg-green-100 text-green-700" },
  eco: { label: "Эко", color: "bg-emerald-100 text-emerald-700" },
  hypo: { label: "Гипоаллергенно", color: "bg-blue-100 text-blue-700" },
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const safety = safetyLabels[product.safety];
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${safety.color}`}>
          {safety.label}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-1">{product.volume}</p>
        <h3 className="font-medium text-sm leading-snug mb-2 flex-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-cormorant text-xl font-semibold text-primary">
            {product.price} ₽
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={14} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
