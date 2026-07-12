
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import Servicios from "./app/Servicios.tsx";
  import Tienda from "./app/Tienda.tsx";
  import Producto from "./app/Producto.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/:slug" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  );
