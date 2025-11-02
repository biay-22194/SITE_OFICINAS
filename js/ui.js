/*(O que o usuário vê): Este arquivo contém todas as funções que mexem no HTML (DOM). 
mostrarHistorico() e sua nova função de gráfico (mostrarGraficoLinha()) vivem aqui.*/

//-----------------------------------------------------------------------------------------------

import { infoUsuario,  media_padrao } from './state.js';
import { analisa_resultados } from './logic.js';
//import { LineGraph } from './script.js';
//-----------------------------------------------------------------------------------------------
// Mostra o histórico na aba de testes
//Guardar o histórico no cartao?????
export function mostrarHistorico(){
    const historico = document.getElementById("historico");
    
    // Limpa a lista antiga antes de criar a nova
    historico.innerHTML = "";

    // Itera pelo array global dadosTestes
    for(let i = 0; i < infoUsuario.historicoTestes.length; i++){
        
        // Pega o objeto atual
        let testeAtual = infoUsuario.historicoTestes[i]; 
        
        // Cria um novo elemento <li>
        let mostrarNovoTeste = document.createElement("li");
        
        // --- CORREÇÃO PRINCIPAL ---
        // Formata o texto para exibição
        mostrarNovoTeste.textContent = `Teste: ${testeAtual.tipo} 
            | Tempo: ${testeAtual.tempo} | Média: ${testeAtual.media}`;
        
        // Adiciona o <li> à lista <ul> (com o nome corrigido)
        historico.appendChild(mostrarNovoTeste);
    }
}
//-----------------------------------------------------------------------------------------------

// Variável para guardar a instância do gráfico
let meuGraficoDeLinha; 

export function mostrarGraficoLinha() {
    
    // 1. VERIFICAR SE HÁ DADOS
    // (Verifica se o usuário está logado E se tem pelo menos 1 bloco)
    if (!infoUsuario || infoUsuario.historicoTestes.length === 0) {
        alert("Você precisa completar pelo menos um bloco de 3 tentativas para ver o gráfico.");
        return; 
    }

    const ctx = document.getElementById('grafico').getContext('2d');

    // 2. LÓGICA DO LOTE (12 TENTATIVAS = 4 BLOCOS)
    
    const totalBlocos = infoUsuario.historicoTestes.length; // Ex: 5 blocos
    
    // Define o limite máximo de blocos POR GRÁFICO
    const maxBlocosNoGrafico = 4; // 12 tentativas / 3 = 4 blocos

    // Descobre em qual "lote" ou "página" de gráfico nós estamos
    // Math.ceil(1/4) = 1. Math.ceil(4/4) = 1.
    // Math.ceil(5/4) = 2. Math.ceil(8/4) = 2.
    const loteAtual = Math.ceil(totalBlocos / maxBlocosNoGrafico); // Ex: Se 5 blocos, loteAtual = 2

    // 3. CALCULAR OS ÍNDICES DO ARRAY PARA ESTE LOTE
    
    // Lote 1 (índices 0-3): startIndex = (1-1)*4 = 0
    // Lote 2 (índices 4-7): startIndex = (2-1)*4 = 4
    const startIndex = (loteAtual - 1) * maxBlocosNoGrafico;

    // Lote 1: endIndex = Math.min(1*4, totalBlocos)
    // Lote 2 (com 5 blocos): endIndex = Math.min(2*4, 5) = 5
    const endIndex = Math.min(loteAtual * maxBlocosNoGrafico, totalBlocos);

    // 4. PREPARAÇÃO DOS DADOS
    const labelsGrafico = [];
    const dadosMediaUsuario = [];
    const dadosLimSup = [];
    const dadosLimInf = [];

    // 5. PREENCHIMENTO DOS ARRAYS (Iterando APENAS no lote atual)
    
    // O loop começa do 'startIndex' e vai até o 'endIndex'
    // Ex: Lote 2 (com 5 blocos): loop vai de i=4 até i<5 (ou seja, roda só para i=4)
    for (let i = startIndex; i < endIndex; i++) {
        
        let testeAtual = infoUsuario.historicoTestes[i]; 
        
        // Analisa o teste 'i' para atualizar 'media_padrao'
        analisa_resultados(i); 

        // Adiciona um rótulo (i + 1) para contagem humana (Bloco 1, Bloco 2, ...)
        labelsGrafico.push(`Bloco ${i + 1} (Tipo ${testeAtual.tipo})`);
        
        // Adiciona os dados para o Eixo Y
        dadosMediaUsuario.push(parseFloat(testeAtual.media));
        dadosLimSup.push(media_padrao.lim_sup);
        dadosLimInf.push(media_padrao.lim_inf);
    }

    // 6. DESTRUIR GRÁFICO ANTIGO (Obrigatório para atualizar)
    if (meuGraficoDeLinha) {
        meuGraficoDeLinha.destroy();
    }

    // 7. CRIAÇÃO DO GRÁFICO
    
    const dadosGrafico = {
        labels: labelsGrafico, 
        datasets: [
            {
                label: 'Média padrão - nível superior',
                data: dadosLimSup,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Média padrão - nível inferior',
                data: dadosLimInf,
                borderColor: 'rgba(255, 238, 0, 1)',
                tension: 0.1,
                fill: false
            },
            {
                label: 'Seus resultados',
                data: dadosMediaUsuario, 
                borderColor: 'rgba(255, 0, 98, 1)',
                tension: 0.1,
                fill: false
            }
        ]
    };

    meuGraficoDeLinha = new Chart(ctx, {
        type: 'line',
        data: dadosGrafico,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false 
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                // Adiciona um título dinâmico para sabermos qual lote estamos vendo
                title: {
                    display: true,
                    text: `Resultados do Lote ${loteAtual} (Tentativas ${startIndex * 3 + 1} a ${endIndex * 3})`
                }
            }
        }
    });
}