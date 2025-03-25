import React from 'react';
import { NavLink } from "react-router-dom";
import './footer.css';
import Bouton from '../../composants/bouton/Bouton';
import Logo from '../../composants/logo/Logo';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-titre">
            <h1>Pas besoin d’en faire plus. Il suffit de le faire mieux – avec PULSE.</h1>
        </div>

        <div className="footer-bouton">
            <Bouton to="/inscription" text="Commencer maintenant" variant="bouton-clair" />
        </div>

        <div className="footer-links">
            <div className="footer-links-logo">
                <Logo />
                <p>Équipe Pulse</p>
            </div>

            <div className="footer-links-conteneur">
                <h4>Liens</h4>
                <NavLink to="/fonctionnalites">Fonctionnalités</NavLink>
                <NavLink to="/temoignages">Témoignages</NavLink>
                <NavLink to="/a-propos">À Propos</NavLink>
                <NavLink to="/blog">Blog</NavLink>
            </div>

            <div className="footer-links-conteneur">
                <h4>Compagnie</h4>
                <NavLink to="/mentions-legales">Termes et Conditions</NavLink>
                <NavLink to="/politique-de-confidentialite">Politique de confidentialité</NavLink>
                <NavLink to="/faq">FAQ</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>

            <div className="footer-links-conteneur">
                <h4>Nous rejoindre</h4>
                <a href="mailto:pulse@contact.com">pulse@contact.com</a>
                <p>1100 R. Notre Dame O</p>
                <p>(439) - 221 - 2834</p>
            </div>
        </div>

        <div className="footer-copyright">
            <p>&copy; Copyright {new Date().getFullYear()} - Tous droits réservés</p>
        </div>
    </div>
  )
}

export default Footer;
