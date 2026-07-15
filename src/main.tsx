
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import Linea from "./app/Linea.tsx";
  import Producto from "./app/Producto.tsx";
  import Cotizar from "./app/Cotizar.tsx";
  import Pago from "./app/Pago.tsx";
  import PagoGracias from "./app/PagoGracias.tsx";
  import { CartProvider } from "./app/cart.tsx";
  import { ContentProvider } from "./app/content.tsx";
  import CartDrawer from "./app/CartDrawer.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ContentProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/linea" element={<Linea />} />
          <Route path="/linea/:slug" element={<Producto />} />
          <Route path="/cotizar" element={<Cotizar />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/pago/gracias" element={<PagoGracias />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
      </ContentProvider>
    </BrowserRouter>
  );
