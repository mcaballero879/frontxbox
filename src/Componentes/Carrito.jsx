import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import "./carrito.css";

const Carrito = () => {
  const [totalPeso, setTotalPeso] = useState(0);
  const { cartItems, removeFromCart, clearCart, pesoCarrito } = useContext(CartContext);

  const Pedido = async () => {
    const pedidoString = localStorage.getItem("cartItems");

    if (pedidoString) {
      try {
        const pedidoArray = JSON.parse(pedidoString);
        const nombres = pedidoArray.map((item) => item.nombre);
        const textoCopiado = nombres.join("\n");
        const mensajeCompleto = `${textoCopiado}\n\nEl peso total es: ${pesoCarrito.toFixed(2)} GB`
        const encodedText = encodeURIComponent(mensajeCompleto);
        const mensaje = `https://api.whatsapp.com/send/?phone=541151120967&text=${encodedText}`;

        await navigator.clipboard.writeText(textoCopiado);
        alert("Pedido copiado al portapapeles. Abriendo WhatsApp...");
        window.open(mensaje);

        return nombres;
      } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert("Error al procesar el pedido. Por favor, inténtalo de nuevo.");
        return [];
      }
    } else {
      console.log("No hay elementos en el carrito.");
      alert("El carrito está vacío.");
      return [];
    }
  };

  // Calcular y guardar el peso total cuando cambien los items del carrito
  useEffect(() => {
    // Guardar items en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    // Calcular el peso total
    const pesoTotal = cartItems.reduce((total, item) => total + parseFloat(item.peso), 0);
    setTotalPeso(pesoTotal);
    
    // Guardar el peso total en localStorage
    localStorage.setItem("pesoTotal", pesoTotal.toString());
  }, [cartItems]);

  // Cargar el peso total al inicio
  useEffect(() => {
    const pesoGuardado = localStorage.getItem("pesoTotal");
    if (pesoGuardado) {
      setTotalPeso(parseFloat(pesoGuardado));
    }
  }, []);

  return (
    <div className="carrito-container">
      <h2 className="carrito-heading">
        {cartItems.length} Juegos Seleccionados
      </h2>
      {cartItems.length === 0 ? (
        <p className="carrito-empty">El pendrive está vacío</p>
      ) : (
        <ul className="carrito-list">
          {cartItems.map((item) => (
            <li key={item._id} className="carrito-list-item">
              <div className="carrito-item-details">
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="carrito-item-image"
                />
                <div>
                  {item.Nombre} - {item.peso} GB
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="carrito-remove-button"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart} className="carrito-clear-button">
        Vaciar carrito
      </button>
      <p className="carrito-empty">Total cargado: {totalPeso.toFixed(2)} GB </p>
      <button onClick={Pedido} className="carrito-clear-button">
        Realizar el pedido
      </button>
    </div>
  );
};

export default Carrito;