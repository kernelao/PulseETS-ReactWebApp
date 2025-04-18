import React from 'react'
import Header from '../../conteneurs/header/Header'
import Footer from '../../conteneurs/footer/Footer'
import SectionTop from '../../composants/sectiontop/SectionTop'
import image from '../../assets/images/image2.png'

const styles = {
  section: {
    padding: '60px 20px',
    backgroundColor: '#f9f9f9',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    color: '#2c2c2c',
    lineHeight: '1.8',
    fontSize: '1.05rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#111',
    marginTop: '40px',
    textAlign: 'center', // <-- on centre le titre ici
  },
  paragraph: {
    marginTop: '12px',
    textAlign: 'justify', // (optionnel) pour rendre les paragraphes plus jolis
  },
}

const Mentions = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Mentions Légales"
        text="Toutes les informations légales liées à Pulse."
      />
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Éditeur de l’application</h2>
          <p style={styles.paragraph}>Pulse est éditée par Pulse Inc., société enregistrée à Montréal, Québec.</p>

          <h2 style={styles.title}>Responsable de la publication</h2>
          <p style={styles.paragraph}>Responsable : Benx K., fondateur et développeur principal.</p>

          <h2 style={styles.title}>Hébergement</h2>
          <p style={styles.paragraph}>Le site et les données sont hébergés sur un VPS sécurisé via Hostinger.</p>

          <h2 style={styles.title}>Propriété intellectuelle</h2>
          <p style={styles.paragraph}>
            Tous les éléments de l’application (code, design, logo) sont la propriété de Pulse Inc. Toute
            reproduction est interdite sans autorisation.
          </p>

          <h2 style={styles.title}>Contact</h2>
          <p style={styles.paragraph}>Pour toute question : contact@pulseapp.com</p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Mentions
