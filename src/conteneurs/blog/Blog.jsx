import React from 'react'
import './blog.css'
import Article from '../../composants/article/Article'

// Importation des images de blog
import article1 from './../../assets/articles/article1.png'
import article2 from './../../assets/articles/article2.png'
import article3 from './../../assets/articles/article3.png'
import article4 from './../../assets/articles/article4.png'
import article5 from './../../assets/articles/article5.png'

const Blog = () => {
  return (
    <div className="blog">
      <div className="blog-titre">
        <h1>
          Profitez des meilleures conseils pour optimiser votre productivité !
        </h1>
      </div>

      <div className="blog-conteneur">
        <div className="conteneur-group1">
          <Article
            imgUrl={article1}
            date="22 Mars, 2025"
            title="Comment booster ta productivité avec PULSE : le combo Pomodoro + Gamification"
          />
        </div>

        <div className="conteneur-group2">
          <Article
            imgUrl={article2}
            date="22 Mars, 2025"
            title="Pourquoi PULSE pourrait bien remplacer toutes tes apps de productivité"
          />
          <Article
            imgUrl={article3}
            date="22 Mars, 2025"
            title="Organise ta vie comme un pro : PULSE et ses fonctionnalités que tu vas adorer"
          />
          <Article
            imgUrl={article4}
            date="22 Mars, 2025"
            title="Gagner des points en travaillant ? PULSE rend la productivité fun et motivante"
          />
          <Article
            imgUrl={article5}
            date="22 Mars, 2025"
            title="Les secrets de la méthode Pomodoro intégrée dans PULSE (et pourquoi ça marche vraiment)"
          />
        </div>
      </div>
    </div>
  )
}

export default Blog
