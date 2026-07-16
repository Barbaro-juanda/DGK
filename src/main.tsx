
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import Linea from "./app/Linea.tsx";
  import Producto from "./app/Producto.tsx";
  import Cotizar from "./app/Cotizar.tsx";
  import { ContentProvider } from "./app/content.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/linea" element={<Linea />} />
          <Route path="/linea/:slug" element={<Producto />} />
          <Route path="/cotizar" element={<Cotizar />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
