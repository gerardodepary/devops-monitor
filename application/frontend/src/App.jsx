import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkServer = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/health");

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const data = await response.json();
      setServer(data);
    } catch (error) {
      setServer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkServer();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>DevOps Monitor</h1>
        <span>Monitoring Dashboard</span>
      </header>

      <main className="container">
        <h2>Tableau de bord</h2>
        <p>Bienvenue sur notre plateforme de supervision DevOps.</p>

        <div className="cards">
          <div className="card">
            <h3>Frontend</h3>
            <p className="status online">EN LIGNE</p>
            <small>React + Vite</small>
          </div>

          <div className="card">
            <h3>Backend API</h3>
            <p className={`status ${server ? "online" : "offline"}`}>
              {loading ? "VÉRIFICATION..." : server ? "EN LIGNE" : "HORS LIGNE"}
            </p>
            <small>Node.js + Express</small>
          </div>

          <div className="card">
            <h3>Docker</h3>
            <p className="status pending">À CONFIGURER</p>
            <small>Conteneurisation</small>
          </div>
        </div>

        <section className="details">
          <h3>État du serveur</h3>

          {server ? (
            <>
              <p>Application : {server.application}</p>
              <p>Statut : {server.status}</p>
              <p>{server.message}</p>
            </>
          ) : (
            <p>
              {loading
                ? "Connexion au serveur..."
                : "Impossible de contacter l'API Node.js."}
            </p>
          )}

          <button onClick={checkServer}>Vérifier le serveur</button>
        </section>
      </main>

      <footer>
        Projet académique DevOps | React - Node.js - Docker
      </footer>
    </div>
  );
}

export default App;