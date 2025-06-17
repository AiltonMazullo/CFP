import React from "react";
import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function Launch() {

  return (
    <>
      <Sidebar />
      <Header />
      <main className="container-lancamentos">
        <div className="container-receitas">
          <button type="button" className="custom-button-lancamentos">
            Receitas
          </button>
          <div className="inputs-lancamentos">
            
          </div>
        </div>
        <div className="container-despesas">
          <button type="button" className="custom-button-despesas">
            Despesas
          </button>
        </div>
        <div className="div-investimentos">
          <button type="button" className="custom-button-investimentos">
            Investimentos
          </button>
        </div>
      </main>
    </>
  );
}

export default Launch;
