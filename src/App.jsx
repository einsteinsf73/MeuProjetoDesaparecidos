import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import './App.css'; // Importa nosso arquivo de estilos!

// Lazy Loading para otimizar o carregamento
const HomePage = lazy(() => import('./pages/HomePage'));
const DetalhesPage = lazy(() => import('./pages/DetalhesPage'));

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pessoa/:id" element={<DetalhesPage />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;