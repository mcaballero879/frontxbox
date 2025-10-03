
import "./Footer.css"

const Footer = () => {
  
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Información</h4>
            <ul>
              <li><a href="/acercade">Acerca de nosotros</a></li> {/* Enlace a "Acerca de" */}
              <li><a href="/contacto">Contacto</a></li> {/* Enlace a "Contacto" */}
              {/* Otros enlaces de información */}
            </ul>
          </div>
          <div className="footer-section">
            <h4>Soporte</h4>
            <ul>
              <li><a href="/https://wa.link/zzlr4z">Preguntas frecuentes</a></li> {/* Enlace a "FAQ" */}
              <li><a href="/envios">Envíos y devoluciones</a></li> {/* Enlace a información de envíos */}
              {/* Otros enlaces de soporte */}
            </ul>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons"> {/* Contenedor para iconos sociales */}
              <a href="https://www.facebook.com/marketplace/profile/1566374584/" target="_blank" ><img src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e316f544f9094143b9eac01f1f19e697.png" alt="Facebook" /></a> {/* Icono de Facebook */}
              <a href="https://www.instagram.com/playthegame879/" target="_blank" ><img src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d6893330740455c96d218258a458aa4.png" alt="Instagram" /></a> {/* Icono de Instagram */}
              {/* Otros iconos sociales */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p> 2025 PlayTheGame. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;