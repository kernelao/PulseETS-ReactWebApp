import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../conteneurs/header/Header'
import Footer from '../../conteneurs/footer/Footer'

const styles = {
  wrapper: {
    minHeight: '80vh',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    color: '#222',
    textAlign: 'center',
  },
  code: {
    fontSize: '7rem',
    fontWeight: 'bold',
    color: '#ff4d4f',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '12px',
  },
  message: {
    fontSize: '1.1rem',
    maxWidth: '600px',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}

const Page404 = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div style={styles.wrapper}>
        <div style={styles.code}>404</div>
        <h1 style={styles.title}>Oups... Cette page n'existe pas</h1>
        <p style={styles.message}>
          La page que vous recherchez est introuvable. Elle a peut-être été déplacée, supprimée ou
          vous avez peut-être saisi une mauvaise adresse.
        </p>
        <button style={styles.button} onClick={() => navigate('/')}>
          Retour à l’accueil
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Page404
