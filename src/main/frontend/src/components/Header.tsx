import React from 'react';
import './styles/Header.css';
import logo from '../assets/images/logo.png';

function Header() {
  return (
    <header>
      <div className="title">
        <a className="titleLink" href="/">
          <img className="logo" src={logo} alt="logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
