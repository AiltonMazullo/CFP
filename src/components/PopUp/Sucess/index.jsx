import React from "react";
import "./styles.css";
import ValidateIcone from "../../../assets/VALIDATE-icone.svg";
import Button from "../../Button";

function SucessPopup({ mensagem, onClose }) {
  return (
    <div className="popup-sucesso-overlay">
      <div className="popup-sucesso">
        <img src={ValidateIcone} alt="Ícone de fechamento" />
        <p>{mensagem}</p>
        <Button onClick={onClose}>Ir para Login</Button>
      </div>
    </div>
  );
}

export default SucessPopup;
