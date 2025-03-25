import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importation des pages vitrine (pages publiques)
import Accueil from "../pages/public/Accueil";
import APropos from "../pages/public/APropos";
import Blog from "../pages/public/Blog";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/FAQ";
import Fonctionnalites from "../pages/public/Fonctionnalites";
import Mentions from "../pages/public/Mentions";
import Politique from "../pages/public/Politique";
import Temoignages from "../pages/public/Temoignages";
import NonTrouvee from "../pages/public/Page404";

// Route temporaire pour tester seulement
import NavbarTest from "../composants/navbar/NavbarTest";


// Importation des pages d'authentification
import Connexion from '../pages/authentification/Connexion';
import Inscription from '../pages/authentification/Inscription';
import ReinitialiserMdp from '../pages/authentification/ReinitialiserMdp';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/fonctionnalites" element={<Fonctionnalites />} />
      <Route path="/mentions-legales" element={<Mentions />} />
      <Route path="/politique-de-confidentialite" element={<Politique />} />
      <Route path="/temoignages" element={<Temoignages />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/reinitialiser-mdp" element={<ReinitialiserMdp />} />

      {/* navbar de test seulement */}
      <Route path="/test-navbar" element={<NavbarTest />} /> 
      
      <Route path="*" element={<NonTrouvee />} />

      
    </Routes>
  );
};

export default PublicRoutes;
