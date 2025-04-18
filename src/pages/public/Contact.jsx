import React from 'react'
import Header from '../../conteneurs/header/Header'
import Footer from '../../conteneurs/footer/Footer'
import SectionTop from '../../composants/sectiontop/SectionTop'
import image from '../../assets/images/image3.png'

const Contact = () => {
  const styles = {
    section: {
      backgroundColor: '#f9f9f9',
      padding: '60px 20px',
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      maxWidth: '800px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      lineHeight: '1.8',
      fontSize: '1.1rem',
      color: '#333',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '30px',
      color: '#222',
    },
    info: {
      marginBottom: '20px',
    },
    email: {
      color: '#4f46e5',
      fontWeight: 'bold',
    },
  }

  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Nous contacter"
        text="Vous avez une question ? On est là pour vous aider !"
      />
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Informations de contact</h2>

          <p style={styles.info}>
            Pour toute question ou remarque concernant l’application <strong>Pulse</strong>, vous pouvez
            nous contacter par courriel :
          </p>

          <p style={styles.info}>
            📧 Adresse email :{' '}
            <span style={styles.email}>support@pulseapp.com</span>
          </p>

          <hr />

          <p style={styles.info}>
            👉 Si vous souhaitez envoyer un message directement aux administrateurs via l’application,
            vous devez d’abord <strong>créer un compte</strong> et être connecté.
          </p>

          <p style={styles.info}>
            Une fois connecté, rendez-vous dans la section <strong>"Aide"</strong> de l’application pour
            envoyer votre message.
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Contact
