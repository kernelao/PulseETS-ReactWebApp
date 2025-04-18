import React from 'react'
import Header from '../../conteneurs/header/Header'
import Footer from '../../conteneurs/footer/Footer'
import SectionTop from '../../composants/sectiontop/SectionTop'
import image from '../../assets/images/image2.png'
import Mobile from '../../conteneurs/mobile/Mobile'

const temoignages = [
  {
    nom: 'Sophie L.',
    role: 'Étudiante en médecine',
    texte:
      "Pulse a totalement changé ma manière d’étudier. Grâce à la méthode Pomodoro, j’arrive enfin à rester concentrée pendant mes révisions.",
  },
  {
    nom: 'Lucas M.',
    role: 'Développeur Web',
    texte:
      "Entre les tâches, le calendrier et le système de points, j’ai enfin trouvé une app qui rend la productivité fun !",
  },
  {
    nom: 'Amina R.',
    role: 'Entrepreneure',
    texte:
      "L’interface est fluide, intuitive, et me permet de planifier mes journées sans prise de tête.",
  },
]

const styles = {
  section: {
    backgroundColor: '#f9f9f9',
    padding: '60px 20px',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  nom: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '20px',
    color: '#111',
  },
  role: {
    fontSize: '0.95rem',
    color: '#777',
    marginBottom: '10px',
  },
  texte: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  },
  titre: {
    fontSize: '2.2rem',
    marginBottom: '40px',
    color: '#222',
  },
}

const Temoignages = () => {
  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Les témoignages"
        text="Découvrez ce que les utilisateurs disent de Pulse."
      />

      <section style={styles.section}>
        <h2 style={styles.titre}>Ils nous font confiance</h2>
        <div style={styles.container}>
          {temoignages.map((t, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <p style={styles.texte}>"{t.texte}"</p>
              <p style={styles.nom}>{t.nom}</p>
              <p style={styles.role}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Mobile />
      <Footer />
    </>
  )
}

export default Temoignages
