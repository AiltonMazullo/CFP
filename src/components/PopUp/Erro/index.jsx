import React from 'react';
import './styles.css';
import CloseIcone from "../../../assets/CLOSE-icone.svg"
import Button from "../../Button"

function ErrorPopUp({ mensagem, onClose }) {
  if (!mensagem) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <img src={CloseIcone} alt="Ícone de fechamento" />
        <p>{mensagem}</p>
        <Button onClick={onClose}>Fechar</Button>
      </div>
    </div>
  );
}

export default ErrorPopUp
