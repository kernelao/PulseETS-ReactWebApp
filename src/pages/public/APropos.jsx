import React from 'react'
import Header from '../../conteneurs/header/Header'
import image from '../../assets/images/image2.png'

import SectionTop from '../../composants/sectiontop/SectionTop'
import Collaboration from '../../conteneurs/collaboration/Collaboration'
import Mission from '../../conteneurs/mission/Mission'
import CTA from '../../conteneurs/cta/CTA'
import Footer from '../../conteneurs/footer/Footer'



const APropos = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Qui SOMMES-NOUS"
        text="Nous sommes dévoué à vous aider dans votre réussite."
      />
      <Collaboration />
      <Mission />
      <CTA />
      <Footer />
    </>
  )
}

export default APropos
