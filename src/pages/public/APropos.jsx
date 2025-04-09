import React from 'react'
import Header from '../../conteneurs/header/Header'
import image from '../../assets/images/image2.png'

import SectionTop from '../../composants/sectiontop/SectionTop'

const APropos = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Qui SOMMES-NOUS"
        text="Nous sommes là pour répondre à toutes vos questions. Envoyez-nous un message!"
      />
    </>
  )
}

export default APropos
