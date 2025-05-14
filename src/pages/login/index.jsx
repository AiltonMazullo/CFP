import React from "react";
import "./styles.css";
import { useState } from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import FormCard from "../../components/FormCard";
import InputText from "../../components/InputText";
import ErrorPopup from "../../components/PopUp/Erro";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
  
    if (!email.includes("@")) {
      setErroMensagem("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }
  
    const dados = { email, password: senha };
  
    try {
      const res = await login(dados);
      console.log("Login realizado com sucesso", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
      
    } catch (erro) {
      const msg =
        erro.response?.data?.message ||
        "E-mail ou senha incorretos. Verifique e tente novamente.";
      setErroMensagem(msg);
    }
  
    setLoading(false);
  }
  
  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="login-left">
            <Logo />
          </div>
          <div className="login-right">
            <FormCard onSubmit={handleLogin}>
              <InputText
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
              <InputText
                label="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
              <div className="container_input-checkbox">
                <input type="checkbox" className="input-checkbox" />
                <p>Lembrar de mim</p>
              </div>
              <div className="botao">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="spinner"></div>
                      Fazendo login...
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
              <nav className="links-navegacao">
                <Link to="/register" className="links-navegacao-registro">
                  Não tem conta? Registre-se
                </Link>
                <Link to="/recuperar-senha" className="links-navegacao-senha">
                  Esqueceu a senha? Altere agora
                </Link>
              </nav>
            </FormCard>
          </div>
        </div>
        <ErrorPopup
          mensagem={erroMensagem}
          onClose={() => setErroMensagem("")}
        />
      </div>
    </>
  );
}

export default Login;
