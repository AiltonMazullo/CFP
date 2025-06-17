import React, { useState, useEffect } from "react";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Moedas from "../../assets/MOEDAS-icone.svg";
import BotaoAdicionar from "../../assets/AD-icone.svg";
import { Link } from "react-router-dom";
import { getReceitas, getDespesas } from "../../services/transService";

function Dashboard() {

  const [totalReceitasMes, setTotalReceitasMes] = useState(0);
  const [totalDespesasMes, setTotalDespesasMes] = useState(0);
  const [saldoFinal, setSaldoFinal] = useState(0);
  const [saldoConta, setSaldoConta] = useState(0);
  const [variacaoReceitas, setVariacaoReceitas] = useState(0);
  const [variacaoDespesas, setVariacaoDespesas] = useState(0);
  const [variacaoSaldo, setVariacaoSaldo] = useState(0);

  useEffect(() => {
    async function calcularFinancas() {
      const receitasRes = await getReceitas();
      const despesasRes = await getDespesas();

      const receitas = receitasRes.data;
      const despesas = despesasRes.data;

      const agora = new Date();
      const mesAtual = agora.getMonth(); 
      const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;
      const anoAtual = agora.getFullYear();
      const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual;

      const totalRec = receitas.reduce((acc, r) => acc + r.valor, 0);
      const totalDes = despesas.reduce((acc, d) => acc + d.valor, 0);
      setSaldoConta(totalRec - totalDes);

      const receitasMesAtual = receitas.filter((r) => {
        const data = new Date(r.data);
        return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
      });
      const despesasMesAtual = despesas.filter((d) => {
        const data = new Date(d.data);
        return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
      });

      const receitasMesAnterior = receitas.filter((r) => {
        const data = new Date(r.data);
        return (
          data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior
        );
      });
      const despesasMesAnterior = despesas.filter((d) => {
        const data = new Date(d.data);
        return (
          data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior
        );
      });

      const totalRecAtual = receitasMesAtual.reduce(
        (acc, r) => acc + r.valor,
        0
      );
      const totalDesAtual = despesasMesAtual.reduce(
        (acc, d) => acc + d.valor,
        0
      );
      const totalRecAnterior = receitasMesAnterior.reduce(
        (acc, r) => acc + r.valor,
        0
      );
      const totalDesAnterior = despesasMesAnterior.reduce(
        (acc, d) => acc + d.valor,
        0
      );

      const saldoAtual = totalRecAtual - totalDesAtual;
      const saldoAnterior = totalRecAnterior - totalDesAnterior;

      setTotalReceitasMes(totalRecAtual);
      setTotalDespesasMes(totalDesAtual);
      setSaldoFinal(saldoAtual);

      const calcularVariacao = (atual, anterior) => {
        if (anterior === 0) return atual === 0 ? 0 : 100;
        return ((atual - anterior) / anterior) * 100;
      };

      setVariacaoReceitas(calcularVariacao(totalRecAtual, totalRecAnterior));
      setVariacaoDespesas(calcularVariacao(totalDesAtual, totalDesAnterior));
      setVariacaoSaldo(calcularVariacao(saldoAtual, saldoAnterior));
    }

    calcularFinancas();
  }, []);

  return (
    <>
      <Sidebar />
        <Header />
      <div className="container-caixas-dashboard">
        <nav className="caixa-navegar caixa-navegar-primeiro">
          <div className="caixa-saldo-conta">
            <img src={Moedas} alt="Imagem de moedas" className="image-moedas" />
            <h3 className="saldo-conta">Saldo em conta</h3>
            <h4 className="dinheiro-conta" id="dinheiro-conta">
              {saldoConta.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
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
              <h3 className="caixa-receitas-receita">
                R${" "}
                {totalReceitasMes.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <p>
                {variacaoReceitas >= 0 ? "+" : "-"}
                {variacaoReceitas.toFixed(1)}% em relação ao mês anterior
              </p>
            </div>
            <div className="caixa-despesas">
              <h3>Despesas</h3>
              <h3 className="caixa-despesas-despesa">
                R${" "}
                {totalDespesasMes.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <p>
                {variacaoDespesas >= 0 ? "+" : "-"}
                {variacaoDespesas.toFixed(1)}% em relação ao mês anterior
              </p>
            </div>
            <div className="caixa-saldos">
              <h3>Saldo Final</h3>
              <h3
                className="caixa-saldos-saldo"
                style={{
                  color: variacaoSaldo >= 0 ? "#049804" : "#c90606",
                }}
              >
                R${" "}
                {saldoFinal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <p>
                {variacaoSaldo >= 0 ? "+" : "-"}
                {variacaoSaldo.toFixed(1)}% em relação ao mês anterior
              </p>
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
