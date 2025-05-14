import api from './api';

export function login(dados) {
  return api.post('/auth', dados);
}

export function registrar(dados) {
  return api.post('/users/register', dados);
}

export function editarUsuario(id, dadosAtualizados) {
  return api.put(`/users/${id}`, dadosAtualizados);
}