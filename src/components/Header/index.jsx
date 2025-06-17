import React from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

function Header() {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const nome = usuario?.nome || "Usuário";

  const data = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const location = useLocation();
  const path = location.pathname;

  const nomePage =
    path === "/"
      ? "Início"
      : path
          .replace("/", "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (loc) => loc.toUpperCase());

  return (
    <header className="cabecalho">
      <h3 className="nome-usuario">
        {nome} | {nomePage}
      </h3>
      <h3 className="data">{data}</h3>
    </header>
  );
}

export default Header;
