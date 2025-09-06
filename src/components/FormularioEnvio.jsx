// src/components/FormularioEnvio.jsx

import React from 'react';
import InputMask from 'react-input-mask';
import api from '../services/api'; // Importamos a API
import '../App.css';

const FormularioEnvio = ({ isOpen, onClose, pessoaId }) => {
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Adiciona o ID da pessoa aos dados
    const payload = {
      ...data,
      pessoa: { id: pessoaId }
    };
    
    try {
      // Tenta fazer o POST para a API real
      await api.post('/ocorrencias', payload);
      alert("Obrigado por sua contribuição! Suas informações foram enviadas com sucesso.");
      onClose();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Não foi possível enviar as informações. O servidor da API pode estar offline.");
    }
  };

return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Registrar Nova Informação</h2>
          <button onClick={onClose} style={styles.closeButton}>X</button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="data_avistamento">Data em que foi visto(a)</label>
            <InputMask 
              mask="99/99/9999" 
              name="data_avistamento" 
              id="data_avistamento"
              className="search-input" // Reutilizando classe de estilo
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="localizacao">Localização (cidade, bairro, rua)</label>
            <input 
              type="text" 
              name="localizacao" 
              id="localizacao" 
              className="search-input" 
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="observacoes">Observações adicionais</label>
            <textarea 
              name="observacoes" 
              id="observacoes" 
              className="search-input" 
              rows="4"
            ></textarea>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="fotos">Anexar fotos</label>
            <input 
              type="file" 
              name="fotos" 
              id="fotos" 
              className="search-input" 
              accept="image/*" 
              multiple 
            />
          </div>
          <button type="submit" className="search-button" style={{ width: '100%', marginTop: '1rem' }}>
            Enviar Informações
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilos para o Modal (para não criar outro arquivo CSS)
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  }
};

export default FormularioEnvio;