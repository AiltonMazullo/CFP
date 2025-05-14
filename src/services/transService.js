import api from './api'

export function getReceitas() {
    return api.get('/receitas')
}

export function getDespesas() {
    return api.get('/despesas')
}