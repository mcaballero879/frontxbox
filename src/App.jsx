import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Paginas/Footer"
import Carrito from "./Componentes/Carrito";
import { CartProvider } from "./Componentes/CartContext";
import { ToastContainer } from "react-toastify";
import Encabezado from "./Paginas/Encabezado";
import FilterSearch from "./Componentes/FilerSearch";


function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Encabezado />
          <Routes>
            <Route path="/" element={<FilterSearch />}></Route>
            <Route path="/carrito" element={<Carrito />}></Route>
            {/* Ruta comodín para rutas no encontradas */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;
