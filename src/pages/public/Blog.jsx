import React from 'react'
import Header from '../../conteneurs/header/Header'
import Footer from '../../conteneurs/footer/Footer'
import SectionTop from '../../composants/sectiontop/SectionTop'
import image from '../../assets/images/image5.png'

import article1 from './../../assets/articles/article1.png'
import article2 from './../../assets/articles/article2.png'
import article3 from './../../assets/articles/article3.png'
import article4 from './../../assets/articles/article4.png'
import article5 from './../../assets/articles/article5.png'

const articles = [
  {
    imgUrl: article1,
    date: '22 Mars, 2025',
    title: 'Comment booster ta productivité avec PULSE : le combo Pomodoro + Gamification',
    content: [
      "La technique Pomodoro est bien plus qu'un simple minuteur. Elle repose sur un principe scientifique : le cerveau humain a besoin de pauses régulières pour maintenir un niveau de concentration élevé. En combinant cette méthode à une application comme PULSE, on obtient une solution optimale.",
      "PULSE utilise un minuteur intégré qui vous guide dans des sessions de 25 minutes de concentration, suivies de 5 minutes de pause. Ce rythme favorise l'attention, la gestion du stress et la satisfaction de progresser étape par étape.",
      "La gamification, quant à elle, transforme cette discipline en jeu. Chaque session complétée vous fait gagner des points. Ces points débloquent des badges et nourrissent un sentiment de progression personnelle.",
      "En résumé, PULSE rend la productivité accessible, motivante et même amusante. C’est le duo gagnant pour ceux qui veulent rester concentrés sans s’épuiser."
    ],
  },
  {
    imgUrl: article2,
    date: '22 Mars, 2025',
    title: 'Pourquoi PULSE pourrait bien remplacer toutes tes apps de productivité',
    content: [
      "Avant PULSE, il fallait jongler entre plusieurs outils : un calendrier, une app de tâches, une autre pour les notes, un minuteur, parfois même un tableau Kanban. Avec PULSE, tout est intégré dans une seule et même interface cohérente.",
      "L’interface est pensée pour la fluidité. Vous pouvez organiser vos journées, suivre vos objectifs, enregistrer des idées et lancer un Pomodoro en quelques clics. Aucun besoin de switcher d’un outil à l’autre, tout est là, centralisé.",
      "Ce qui différencie aussi PULSE, c’est l’attention portée à la motivation. Grâce au système de récompenses, l’utilisateur reste engagé. Finis les to-do lists que l’on abandonne au bout d’une semaine.",
      "PULSE n’est pas une énième app de productivité, c’est un coach digital intelligent qui vous suit et s’adapte à votre rythme."
    ],
  },
  {
    imgUrl: article3,
    date: '22 Mars, 2025',
    title: 'Organise ta vie comme un pro : PULSE et ses fonctionnalités que tu vas adorer',
    content: [
      "PULSE n’est pas seulement une application pour étudiants ou freelances. Ses fonctionnalités sont pensées pour s’adapter à tous les profils, du parent actif à l’entrepreneur débordé.",
      "Vous y trouverez une vue hebdomadaire de vos tâches, un calendrier intelligent avec rappels, des filtres pour visualiser par priorité ou par projet, et même une section prise de notes synchronisée avec vos tâches.",
      "L’un des atouts majeurs est la fonction « Focus Mode », qui vous place dans une ambiance sans distraction avec un timer, un fond sonore optionnel et une interface minimaliste.",
      "Le tout est bien sûr accessible depuis votre mobile ou ordinateur. Synchronisé, rapide, et agréable à utiliser : vous allez (enfin) prendre plaisir à vous organiser."
    ],
  },
  {
    imgUrl: article4,
    date: '22 Mars, 2025',
    title: 'Gagner des points en travaillant ? PULSE rend la productivité fun et motivante',
    content: [
      "On a tous déjà abandonné une routine de productivité parce que… c’était trop sérieux. Trop rigide. PULSE a compris ce frein, et a choisi d’y remédier avec la gamification.",
      "Chaque tâche complétée, chaque session Pomodoro terminée, chaque semaine respectée vous rapporte des points. Ces points sont visibles dans votre profil et vous font passer de niveau.",
      "Ce système crée un effet boule de neige : plus vous progressez, plus vous avez envie de continuer. Vous pouvez même débloquer des badges thématiques pour renforcer la motivation.",
      "Vous n’êtes plus dans un système de contraintes, mais dans une mécanique de jeu. Et c’est justement cela qui vous pousse à garder le cap."
    ],
  },
  {
    imgUrl: article5,
    date: '22 Mars, 2025',
    title: 'Les secrets de la méthode Pomodoro intégrée dans PULSE (et pourquoi ça marche vraiment)',
    content: [
      "La méthode Pomodoro repose sur une idée simple : travailler en cycles courts et intensifs pour maximiser la concentration. 25 minutes de travail, 5 minutes de pause. Simple, mais redoutablement efficace.",
      "Dans PULSE, tout est automatisé. Vous lancez votre session et l’app s’occupe du reste. Vous êtes notifié quand il est temps de faire une pause et quand il faut reprendre. Finies les pertes de temps entre deux tâches.",
      "Mais ce n’est pas tout. Chaque session est enregistrée, ce qui vous permet de voir combien de blocs de concentration vous avez complétés dans la journée ou la semaine.",
      "Résultat ? Une vision claire de votre productivité réelle, et un moyen concret de voir vos efforts s’accumuler. PULSE fait de la méthode Pomodoro un outil quotidien concret, pas juste une théorie."
    ],
  },
]

const Blog = () => {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '60px auto',
      padding: '0 20px',
    },
    articleBlock: {
      marginBottom: '50px',
    },
    image: {
      display: 'block',
      margin: '0 auto',        
      maxWidth: '500px',         
      width: '100%',             
      height: 'auto',           
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    },
    date: {
      fontSize: '0.95rem',
      color: '#888',
      marginTop: '15px',
    },
    title: {
      fontSize: '1.8rem',
      margin: '10px 0',
      color: '#222',
    },
    content: {
      fontSize: '1.1rem',
      lineHeight: '1.7',
      color: '#444',
      marginBottom: '10px',
    },
    divider: {
      marginTop: '40px',
      border: 'none',
      height: '1px',
      backgroundColor: '#e0e0e0',
    },
  }

  return (
    <>
      <Header />
      <SectionTop
        backgroundImage={image}
        title="Notre blog"
        text="Profitez de nos meilleurs conseils pour optimiser votre productivité !"
      />
      <div style={styles.container}>
        {articles.map((article, index) => (
          <div key={index} style={styles.articleBlock}>
            <img src={article.imgUrl} alt={article.title} style={styles.image} />
            <p style={styles.date}>{article.date}</p>
            <h2 style={styles.title}>{article.title}</h2>
            {article.content.map((para, i) => (
              <p key={i} style={styles.content}>{para}</p>
            ))}
            {index < articles.length - 1 && <hr style={styles.divider} />}
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Blog
