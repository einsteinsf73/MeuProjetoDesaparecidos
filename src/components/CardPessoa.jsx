import React from 'react';
import { Link } from 'react-router-dom';

const CardPessoa = ({ pessoa }) => {
  const statusClass = pessoa.status === 'DESAPARECIDO'
    ? 'status-desaparecido'
    : 'status-localizado';

  return (
    <div className="card">
      <Link to={`/pessoa/${pessoa.id}`}>
        <img className="card-image" src={pessoa.foto} alt={pessoa.nome} loading="lazy" />
        <div className="card-content">
          <h3 className="card-title">{pessoa.nome}</h3>
          <p>Idade: {pessoa.idade} anos</p>
          <div className={`card-status ${statusClass}`}>
            {pessoa.status}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardPessoa;