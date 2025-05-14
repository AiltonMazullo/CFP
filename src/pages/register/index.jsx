import React, { useState } from "react";
import "./styles.css";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import FormCard from "../../components/FormCard";
import InputText from "../../components/InputText";
import ErrorPopup from "../../components/PopUp/Erro";
import SucessPopup from "../../components/PopUp/Sucess";
import { registrar } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateNome = (nome) => {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return nomeRegex.test(nome);
  };

  const validateCPFFormat = (cpf) => {
    const cpfRegex = /^\d{11}$/; // aceita só 11 dígitos
    return cpfRegex.test(cpf.replace(/[^\d]/g, ""));
  };

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    if (!validateNome(nome.trim())) {
      setErroMensagem("Digite um nome válido");
      setLoading(false);
      return;
    }

    if (!cpf.trim()) {
      setErroMensagem("O CPF é obrigatório.");
      setLoading(false);
      return;
    }

    if (!validateCPFFormat(cpf)) {
      setErroMensagem("CPF deve ter 11 números.");
      return;
    }

    if (!validateEmail(email)) {
      setErroMensagem("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErroMensagem("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    if (senha !== confirmarSenha) {
      setErroMensagem("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    const dados = { nome, email, cpf, password: senha };

    try {
      const res = await registrar(dados);
      console.log("Usuário cadastrado com sucesso", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setSucesso(true);
    } catch (erro) {
      const msg = erro.response?.data?.message || "Erro ao registrar usuário.";
      setErroMensagem(msg);
    }

    setLoading(false);
  }

  function handleFecharPopupSucesso() {
    setSucesso(false);
    navigate("/login");
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <FormCard onSubmit={handleRegister}>
            <InputText
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
            />
            <InputText
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
            <InputText
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
            />
            <InputText
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
            <InputText
              label="Repita a senha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite sua confirmação de senha"
            />
            <div className="botao">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="spinner"></div>
                    Registrando...
                  </div>
                ) : (
                  "Registrar"
                )}
              </Button>
            </div>
            <nav className="links-navegacao">
              <Link to="/login" className="links-navegacao-login">
                Já tem conta? Entre
              </Link>
            </nav>
          </FormCard>
        </div>
        <div className="register-right">
          <Logo />
        </div>
      </div>
      <ErrorPopup mensagem={erroMensagem} onClose={() => setErroMensagem("")} />
      {sucesso && (
        <SucessPopup
          mensagem="Cadastro realizado com sucesso!"
          onClose={handleFecharPopupSucesso}
        />
      )}
    </div>
  );
}

export default Register;
