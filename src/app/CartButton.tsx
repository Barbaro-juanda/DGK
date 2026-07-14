import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart";

export default function CartButton({ dark = false }: { dark?: boolean }) {
  const { open, count } = useCart();
  return (
    <button
      onClick={open}
      aria-label={count > 0 ? `Abrir carrito, ${count} producto${count === 1 ? "" : "s"}` : "Abrir carrito"}
      className={`relative grid size-10 place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B500] ${
        dark ? "border-[#171714]/25 text-[#171714] hover:border-[#171714]" : "border-white/25 text-white hover:border-[#E5B500] hover:bg-white/10"
      }`}
    >
      <ShoppingCart size={17} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#E5B500] px-1 font-mono text-[10px] font-bold leading-5 text-[#171714]">
          {count}
        </span>
      )}
    </button>
  );
}
