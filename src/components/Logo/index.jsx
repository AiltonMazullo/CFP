import React from "react";
import "./styles.css";
import LogoCFP from "../../assets/CFP-imagem.svg";

function Logo() {
  return (
      <img className="logo-image" src={LogoCFP} alt="Logo da CFP" />
  );
}

export default Logo;
