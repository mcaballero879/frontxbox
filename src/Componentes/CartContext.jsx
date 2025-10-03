import React, { createContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [peso32, setPeso32] = useState(28);
    const [peso64, setPeso64] = useState(56);
    // Inicializa el pesoCarrito leyendo del localStorage si hay items
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    
    // Calcula el peso inicial del carrito basado en los items cargados
    const initialPeso = cartItems.reduce((total, item) => total + parseFloat(item.peso), 0);
    const [pesoCarrito, setPesoCarrito] = useState(initialPeso);

    const [pesoMaximo, setPesoMaximo] = useState(peso32); // Estado para el peso máximo actual

    useEffect(() => {
        // Al cargar, ajusta el peso máximo si el peso actual excede el de 32GB
        if (pesoCarrito > peso32) {
            setPesoMaximo(peso64);
        } else {
            setPesoMaximo(peso32);
        }
    }, []); // Solo al montar

    useEffect(() => {
        // Sincroniza cartItems con localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // RECÁLCULO SEGURO: Recalcula el peso total cada vez que cartItems cambia
        const newPeso = cartItems.reduce((total, item) => total + parseFloat(item.peso), 0);
        setPesoCarrito(newPeso);
        
    }, [cartItems]); // 👈 CLAVE: Este useEffect garantiza la consistencia

    const addToCart = (item) => {
        // Usamos el pesoCarrito ya actualizado por el useEffect
        if (pesoCarrito + parseFloat(item.peso) > pesoMaximo) { 
            if (pesoMaximo === peso32) {
                if (confirm('No hay suficiente espacio ¿desea cambiar a uno de 64 gb?')) {
                    setPesoMaximo(peso64); // Cambia el peso máximo a 64GB
                    if (pesoCarrito + parseFloat(item.peso) > peso64) {
                        toast.warning('No hay suficiente espacio para agregar el juego', { autoClose: 1000 });
                        return;
                    }
                } else {
                    return; // El usuario canceló el cambio a 64GB
                }
            } else {
                toast.warning('No hay suficiente espacio para agregar el juego', { autoClose: 1000 });
                return;
            }
        }

        setCartItems((prevItems) => {
            const itemExists = prevItems.some((cartItem) => cartItem._id === item._id);
            if (itemExists) {
                toast.error('Este juego ya está en el carrito', { autoClose: 1000 });
                return prevItems;
            } else {
                // El peso se actualizará automáticamente en el useEffect
                toast.success('Juego agregado', { autoClose: 1000 });
                return [...prevItems, item];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            // No necesitamos llamar a restaCarrito aquí, el useEffect lo maneja
            const newItems = prevItems.filter((item) => item._id !== itemId);
            toast.info('Juego eliminado', { autoClose: 1000 });
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        setPesoCarrito(0);
        setPesoMaximo(peso32); // Resetea el peso máximo a 32GB
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        pesoCarrito,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};