import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NavbarTest = () => {
  const {
    isAuthenticated,
    isAdmin,
    simulateUser,
    simulateAdmin,
    resetSimulation,
    logout,
  } = useAuth()

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Navbar de test</h1>

      {/* Navbar Publique */}
      {!isAuthenticated && (
        <section
          style={{
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <h2>Navbar Publique</h2>
          <NavLink to="/">Accueil</NavLink> |{' '}
          <NavLink to="/connexion">Connexion</NavLink> |{' '}
          <NavLink to="/inscription">Inscription</NavLink> |{' '}
          <NavLink to="/contact">Contact</NavLink> |{' '}
          <NavLink to="/a-propos">À propos</NavLink> |{' '}
          <NavLink to="/faq">FAQ</NavLink> |{' '}
          <NavLink to="/mentions-legales">Mentions légales</NavLink> |{' '}
          <NavLink to="/politique-de-confidentialite">
            Politique de confidentialité
          </NavLink>{' '}
          | <NavLink to="/temoignages">Témoignages</NavLink>
        </section>
      )}

      {/* Navbar Utilisateur */}
      {isAuthenticated && !isAdmin && (
        <section
          style={{
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <h2>Navbar Utilisateur</h2>
          <NavLink to="/app/dashboard">Dashboard</NavLink> |{' '}
          <NavLink to="/app/profil">Profil</NavLink> |{' '}
          <NavLink to="/app/pomodoro">Pomodoro</NavLink> |{' '}
          <NavLink to="/app/notes">Notes</NavLink> |{' '}
          <NavLink to="/app/taches">Tâches</NavLink> |{' '}
          <NavLink to="/app/reglages">Réglages</NavLink> |{' '}
          <NavLink to="/app/boutique">Boutique</NavLink> |{' '}
          <NavLink to="/app/aide">Aide</NavLink> |{' '}
          <button onClick={logout} style={{ marginLeft: '1rem' }}>
            Se déconnecter
          </button>
        </section>
      )}

      {/* Navbar Admin */}
      {isAuthenticated && isAdmin && (
        <section
          style={{
            marginBottom: '2rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem',
          }}
        >
          <h2>Navbar Admin</h2>
          <NavLink to="/admin/adminDashboard">Dashboard Admin</NavLink> |{' '}
          <NavLink to="/admin/utilisateur">Utilisateurs</NavLink> |{' '}
          <NavLink to="/admin/reglages">Réglages</NavLink> |{' '}
          <NavLink to="/admin/boutique">Boutique</NavLink> |{' '}
          <button onClick={logout} style={{ marginLeft: '1rem' }}>
            Se déconnecter
          </button>
        </section>
      )}

      {/* Boutons de simulation (dev uniquement) */}
      {process.env.NODE_ENV === 'development' && (
        <section>
          <h3>Simulation de rôle (dev uniquement)</h3>
          {!isAuthenticated ? (
            <>
              <button onClick={simulateUser} style={{ marginRight: '1rem' }}>
                Simuler Utilisateur
              </button>
              <button onClick={simulateAdmin}>Simuler Admin</button>
            </>
          ) : (
            <button onClick={resetSimulation}>
              Réinitialiser la simulation
            </button>
          )}
        </section>
      )}
    </div>
  )
}

export default NavbarTest
