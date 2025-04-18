import React from 'react'
import Header from '../../conteneurs/header/Header'
import image from '../../assets/images/image3.png'

import SectionTop from '../../composants/sectiontop/SectionTop'
import Footer from '../../conteneurs/footer/Footer'
import FaqSection from '../../composants/faq/Faq'



const FAQ = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="FAQ"
        text="Les questions qu'on posent d'habitude."
      />



      <FaqSection />
      <Footer />

    </>
  )
}

export default FAQ