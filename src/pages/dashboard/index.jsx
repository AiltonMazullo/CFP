import React from "react";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Moedas from "../../assets/MOEDAS-icone.svg";
import BotaoAdicionar from "../../assets/AD-icone.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <h3 className="nome-usuario">Ailton Rodrigues | Dashboard</h3>
      <h3 className="data">dd/mm/yyyy</h3>
      <div className="container-caixas-dashboard">
        <nav className="caixa-navegar caixa-navegar-primeiro">
          <div className="caixa-saldo-conta">
            <img src={Moedas} alt="Imagem de moedas" className="image-moedas" />
            <h3 className="saldo-conta">Saldo em conta</h3>
            <h4 className="dinheiro-conta">R$ 10.000</h4>
            <Link to="/lancamentos" className="caixa-link">
              <img
                src={BotaoAdicionar}
                alt="Botão de adicionar"
                className="image-adicionar"
              />
            </Link>
          </div>
          <div className="caixas-secundarias">
            <div className="caixa-receitas">
              <h3>Receitas</h3>
              <h3 className="caixa-receitas-receita">R$ 2.500,00</h3>
              <p>+7% Em relação ao mês anterior</p>
            </div>
            <div className="caixa-despesas">
              <h3>Despesas</h3>
              <h3 className="caixa-despesas-despesa">R$ 1.750,00</h3>
              <p>-3% Em relação ao mês anterior</p>
            </div>
            <div className="caixa-saldos">
              <h3>Saldo Final</h3>
              <h3 className="caixa-saldos-saldo">R$ 750,00</h3>
              <p>+2% Em relação ao mês anterior</p>
            </div>
          </div>
        </nav>
        <div className="caixa-navegar caixa-navegar-segundo">
          <h3>Fluxo de caixa</h3>
        </div>
        <div className="caixa-navegar caixa-navegar-terceiro">
          <h3>Lucro Mensal</h3>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
