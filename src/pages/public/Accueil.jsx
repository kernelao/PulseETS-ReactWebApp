import React from 'react';

import Header from '../../conteneurs/header/Header';
import Hero from '../../conteneurs/hero/Hero';
import Collaboration from '../../conteneurs/collaboration/Collaboration';
import Mission from '../../conteneurs/mission/Mission';
import Fonctionnalites from '../../conteneurs/fonctionnalites/Fonctionnalites';
import Mobile from '../../conteneurs/mobile/Mobile';
import CTA from '../../conteneurs/cta/CTA';
import Blog from '../../conteneurs/blog/Blog';
import Footer from '../../conteneurs/footer/Footer';

const Accueil = () => {
  return (
    <>
      <Header />
      <Hero />
      <Collaboration />
      <Mission />
      <Fonctionnalites />
      <Mobile />
      <CTA />
      <Blog />
      <Footer />
    </>
  )
}

export default Accueil