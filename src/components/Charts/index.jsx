import React, { useEffect, useState } from "react";
import './styles.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getReceitas, getDespesas } from "../../services/transService";


function Charts() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function axiosData() {
            const receitaRes = await getReceitas();
            const despesaRes = await getDespesas();

            const receitas = receitaRes.data;
            const despesas =  despesaRes.data;

            const combinado = {};

            receitas.forEach((r) => {
                const mes = new Date(r.data).getMonth() + 1;
                combinado[mes] = combinado[mes] || { mes: `M${mes}`, receitas: 0, despesas: 0 };
                combinado[mes].receitas += r.valor;
            });

            despesas.forEach((r) => {
                const mes = new Date(r.data).getMonth() + 1;
                combinado[mes] = combinado[mes] || { mes: `M${mes}`, receitas: 0, despesas: 0 }
                combinado[mes].despesas += r.valor;
            });

            setDados(Object.values(combinado));
        }

        axiosData();
    }, []);

    return(
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dados}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="receitas" fill="#7c3aed" className="grafico"/>
        <Bar dataKey="despesas" fill="#f59e0b" className="grafico"/>
      </BarChart>
    </ResponsiveContainer>
    )
}

export default Charts;