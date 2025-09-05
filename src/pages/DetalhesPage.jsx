// src/pages/DetalhesPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Spinner from '../components/Spinner';
import FormularioEnvio from '../components/FormularioEnvio'; // Importe o formulário

const DetalhesPage = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  useEffect(() => {
    const carregarDetalhes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/pessoas/${id}`);
        setPessoa(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setError("Não foi possível carregar os detalhes desta pessoa.");
      } finally {
        setLoading(false);
      }
    };
    carregarDetalhes();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return (
      <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <Link to="/" className="search-button" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
              Voltar para a Home
          </Link>
      </div>
  );
  if (!pessoa) return <p>Pessoa não encontrada.</p>;

  const statusColor = pessoa.status === 'DESAPARECIDO' ? '#f59e0b' : '#22c55e';

  return (
    <div className="container">
      {/* O formulário modal que será aberto */}
      <FormularioEnvio 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pessoaId={pessoa.id}
      />

      <div className="details-container">
        <div className="details-image-wrapper">
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={pessoa.foto} alt={pessoa.nome} />
        </div>
        <div className="details-content">
          <h1 className="details-title">{pessoa.nome}</h1>
          <div className="details-status-box" style={{ borderColor: statusColor, background: `${statusColor}20` }}>
            Status: <span style={{ fontWeight: 'bold' }}>{pessoa.status}</span>
          </div>
          <div className="details-info-grid">
            <p><strong>Idade:</strong> {pessoa.idade} anos</p>
            <p><strong>Sexo:</strong> {pessoa.sexo}</p>
            <p><strong>Data de Nascimento:</strong> {new Date(pessoa.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Cidade:</strong> {pessoa.cidade?.nome}</p>
            <p><strong>Estado:</strong> {pessoa.cidade?.uf}</p>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Última Ocorrência</h3>
            <p style={{ marginTop: '0.5rem', background: '#f3f4f6', padding: '0.75rem', borderRadius: '8px' }}>
              {pessoa.ocorrencia?.descricao || 'Nenhuma descrição disponível.'}
            </p>
          </div>

          {/* O botão para acionar o formulário */}
          <div style={{ marginTop: '2rem' }}>
            <button 
              className="search-button" 
              style={{ width: '100%', padding: '0.75rem' }}
              onClick={() => setIsModalOpen(true)}
            >
              Enviar Nova Informação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPage;