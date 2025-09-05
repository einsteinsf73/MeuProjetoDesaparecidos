// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CardPessoa from '../components/CardPessoa';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const carregarPessoas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/pessoas/aberto', {
          params: {
            page: pagina,
            size: 10, // Requisito de no mínimo 10 por página
            nome: busca,
          },
        });
        setPessoas(response.data.content);
        setTotalPaginas(response.data.totalPages);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setError("Falha ao carregar os dados. O servidor da API pode estar offline. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    carregarPessoas();
  }, [pagina, busca]);

  const handleBusca = (e) => {
    e.preventDefault();
    setPagina(0); // Reinicia a paginação ao fazer uma nova busca
    setBusca(e.target.elements.search.value);
  };

  return (
    <div className="container">
      {/* --- CAMPO DE BUSCA --- */}
      <form onSubmit={handleBusca} className="search-form">
        <input
          type="text"
          name="search"
          placeholder="Buscar por nome..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {loading && <Spinner />}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {!loading && !error && (
        <>
          {/* --- EXIBIÇÃO EM CARDS --- */}
          <div className="grid-container">
            {pessoas.map(pessoa => (
              <CardPessoa key={pessoa.id} pessoa={pessoa} />
            ))}
          </div>

          {/* --- CONTROLES DE PAGINAÇÃO --- */}
          {totalPaginas > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPagina(p => Math.max(0, p - 1))}
                disabled={pagina === 0}
              >
                Anterior
              </button>
              <span>Página {pagina + 1} de {totalPaginas}</span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))}
                disabled={pagina + 1 >= totalPaginas}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;