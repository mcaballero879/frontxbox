import "./filterSearch2.css";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const FilterSearch = () => {
  const { addToCart } = useContext(CartContext);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [games, setGames] = useState([]);
  const [filterGamesList, setFilterGamesList] = useState([]);
  const [filtroPeso, setFiltroPeso] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("ninguno");

  const aplicarFiltros = () => {
    let juegosFiltrados = games;

    if (filtroActivo === "nombre" && inputValue.trim() !== "") {
      juegosFiltrados = games.filter((game) =>
        game.nombre.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else if (filtroActivo === "peso" && filtroPeso !== "") {
      juegosFiltrados = games.filter((game) => game.peso <= parseFloat(filtroPeso));
    }

    setFilterGamesList(juegosFiltrados);
  };

  const handleFiltronombre = (value) => {
    setInputValue(value);
    setFiltroActivo(value.trim() !== "" ? "nombre" : "ninguno");
  };

  const handleFiltroPeso = (pesoMaximo) => {
    setFiltroPeso(pesoMaximo);
    setFiltroActivo(pesoMaximo !== "" ? "peso" : "ninguno");
  };

  const resetearFiltros = () => {
    setInputValue("");
    setFiltroPeso("");
    setFiltroActivo("ninguno");
  };

  const fetchData = async () => {
    try {
      setIsloading(true);
      const res = await fetch("https://backendxbox.onrender.com/juegos");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Datos recibidos:", data); // Para debug
      
      // CORRECCIÓN: El array de juegos está en la propiedad `datos`
      let juegosData = data.datos; // Cambiamos aquí
      
      // Aseguramos que sea un array
      if (!Array.isArray(juegosData)) {
        console.error("La propiedad 'datos' no es un array:", juegosData);
        juegosData = [];
      }
      
      setGames(juegosData);
      setFilterGamesList(juegosData);
      
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
      setFilterGamesList([]);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    aplicarFiltros();
  }, [games, inputValue, filtroPeso, filtroActivo]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="games-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando juegos...</p>
        </div>
      ) : (
        <div className="container-tarjetas">
          <div className="filters-container">
            <div className="search-box">
              <input
                type="search"
                placeholder="Escribe el nombre de un juego..."
                value={inputValue}
                onChange={(e) => handleFiltronombre(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              <select 
                onChange={(e) => handleFiltroPeso(e.target.value)}
                value={filtroPeso}
                className="filter-select"
              >
                <option value="">Todos los tamaños</option>
                <option value="0.5">Hasta 0.5 GB</option>
                <option value="1">Hasta 1 GB</option>
                <option value="2">Hasta 2 GB</option>
                <option value="8">Hasta 8 GB</option>
                <option value="20">Hasta 20 GB</option>
              </select>

              <button onClick={resetearFiltros} className="reset-btn">
                🔄 Resetear
              </button>
            </div>
          </div>

          <div className="filter-indicator">
            {filtroActivo === "nombre" && (
              <span className="active-filter">Buscando: "<strong>{inputValue}</strong>"</span>
            )}
            {filtroActivo === "peso" && (
              <span className="active-filter">Filtrado por peso: hasta <strong>{filtroPeso} GB</strong></span>
            )}
            {filtroActivo === "ninguno" && (
              <span className="active-filter">Mostrando todos los juegos</span>
            )}
            <span className="games-count">
              {Array.isArray(filterGamesList) ? filterGamesList.length : 0} juegos encontrados
            </span>
          </div>

          {Array.isArray(filterGamesList) && filterGamesList.length > 0 ? (
            filterGamesList.map((game) => (
              <div className="tarjetas" key={game._id}>
                <h1>{game.nombre}</h1>
                <img 
                  src={game.img === "vacio" ? "/no_disponible.png" : game.img} 
                  alt={game.nombre || "Juego"}
                  onError={(e) => {
                    e.target.src = "/no_disponible.png";
                  }}
                />
                <h2>{game.peso} GB</h2>
                <button 
                  onClick={() => addToCart(game)}
                  className="add-to-cart-btn"
                >
                  💾 Agregar al pendrive
                </button>
              </div>
            ))
          ) : (
            !isLoading && (
              <div className="no-results">
                <div className="no-results-icon">😕</div>
                <h3>No se encontraron juegos</h3>
                <p>Intenta con otros términos de búsqueda o ajusta los filtros</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSearch;