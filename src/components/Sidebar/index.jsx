import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import IconeCFP from "../../assets/CFP-icone.svg";
import HomeIcone from "../../assets/HOME-icone.svg";
import AddIcone from "../../assets/ADD-icone.svg";
import ConfigIcone from "../../assets/CONFIG-icone.svg";
import ExitIcone from "../../assets/EXIT-icone.svg";

function Sidebar() {
  return (
    <aside className="container">
      <nav className='container-navegacao'>
      <img className="icone-image icone-image-cfp" src={IconeCFP} alt="Ícone da CFP" />
        <ul className='container-navegacao-lista'>
          <li className='container-navegacao-lista-item'>
            <Link to="/dashboard" className="link-icone-image-home">
              <img
                className="icone-image icone-image-home"
                src={HomeIcone}
                alt="Ícone de Home"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className='container-navegacao-lista-item'>
            <Link to="/lancamentos" className="link-icone-image-add">
              <img
                className="icone-image icone-image-add"
                src={AddIcone}
                alt="Ícone de Adicionar"
              />
              <span>Lançamentos</span>
            </Link>
          </li>
          <li className='container-navegacao-lista-item'>
            <Link to="/configuracoes" className="link-icone-image-config">
              <img
                className="icone-image icone-image-config"
                src={ConfigIcone}
                alt="Ícone de Configurações"
              />
              <span>Configurações</span>
            </Link>
          </li>
          <li className='container-navegacao-lista-item'>
            <Link to="/login" className="link-icone-image-exit">
              <img
                className="icone-image icone-image-exit"
                src={ExitIcone}
                alt="Ícone de Sair"
              />
              <span>Sair</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
