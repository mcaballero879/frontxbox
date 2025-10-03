import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./estilos.css";

const Encabezado = () => {
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuActive(false);
      }
    };

    // Cerrar menú al cambiar de ruta
    const handleRouteChange = () => {
      setMenuActive(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setMenuActive(false);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <header>
        <div className="container">
          <button 
            ref={buttonRef}
            className={`menu-btn ${menuActive ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Menú"
            aria-expanded={menuActive}
          >
            {menuActive ? "✕" : "☰"}
          </button>
          
          <img
            src="./logo.png"
            alt="robot azul"
            width="10%"
          />
          
          <p className="logo">
            <img src="./PlayTheGame.png" width={180} alt="PlayTheGame" />
          </p>
          
          <nav 
            ref={menuRef} 
            className={menuActive ? "active" : ""}
            aria-hidden={!menuActive}
          >
            <Link to={"/"} onClick={handleLinkClick}>
              <h4>Buscar juegos</h4>
            </Link>
            <Link to={"/carrito"} onClick={handleLinkClick}>
              <h4>Lista de juegos cargados</h4>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Encabezado;