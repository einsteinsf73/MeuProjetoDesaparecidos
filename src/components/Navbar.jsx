import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <Link to="/" className="navbar-title">
        Pessoas Desaparecidas - PJC/MT
      </Link>
    </div>
  </nav>
);

export default Navbar;