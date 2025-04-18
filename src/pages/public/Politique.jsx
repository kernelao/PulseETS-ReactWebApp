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

const Politique = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Politique de Confidentialité"
        text="Notre engagement pour la protection de vos données."
      />
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Collecte des données</h2>
          <p style={styles.paragraph}>
            Nous collectons uniquement les données nécessaires à votre expérience : email, nom
            d’utilisateur, historique de tâches, sessions Pomodoro, etc.
          </p>

          <h2 style={styles.title}>Utilisation des données</h2>
          <p style={styles.paragraph}>
            Vos données sont utilisées uniquement pour faire fonctionner l’application et améliorer votre expérience.
          </p>

          <h2 style={styles.title}>Stockage et sécurité</h2>
          <p style={styles.paragraph}>
            Toutes les données sont chiffrées et stockées de manière sécurisée. L'accès est restreint et protégé par authentification.
          </p>

          <h2 style={styles.title}>Vos droits</h2>
          <p style={styles.paragraph}>
            Vous pouvez à tout moment demander la suppression ou la modification de vos données via votre profil ou par contact direct.
          </p>

          <h2 style={styles.title}>Cookies</h2>
          <p style={styles.paragraph}>
            Des cookies peuvent être utilisés à des fins de statistiques ou de confort de navigation. Vous pouvez les refuser dans les réglages de votre navigateur.
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Politique
