import React from 'react'
import Header from '../../conteneurs/header/Header'
import image from '../../assets/images/image5.png'

import SectionTop from '../../composants/sectiontop/SectionTop'
import Footer from '../../conteneurs/footer/Footer'
import Fonctionnalite from '../../conteneurs/fonctionnalites/Fonctionnalites'
import Mobile from '../../conteneurs/mobile/Mobile'
import CTA from '../../conteneurs/cta/CTA'



const Fonctionnalites = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Nos fonctionnalités"
        text="Ce que peut faire notre application."
      />
      <Fonctionnalite />
      <Mobile />
      <CTA />
      <Footer />

    </>
  )
}

export default Fonctionnalites
