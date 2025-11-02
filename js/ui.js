/*(O que o usuário vê): Este arquivo contém todas as funções que mexem no HTML (DOM). 
mostrarHistorico() e sua nova função de gráfico (mostrarGraficoLinha()) vivem aqui.*/

//-----------------------------------------------------------------------------------------------

import { dadosTestes,  media_padrao, tentativas } from './state.js';
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
    for(let i = 0; i < dadosTestes.length; i++){
        
        // Pega o objeto atual
        let testeAtual = dadosTestes[i]; 
        
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
// Função que cria o gráfico
//Guardar gráfico no cartão?????
export function mostrarGraficoLinha() {
    
    // ---- INÍCIO DO DIAGNÓSTICO ----
    // Isso vai nos dizer o que a função está vendo.
    console.log("Função 'mostrarGraficoLinha' foi chamada!");
    console.log("Número de Tentativas (contador):", tentativas);
    console.log("Array 'dadosTestes' (os blocos):", dadosTestes);
    console.log("Tamanho do array 'dadosTestes':", dadosTestes.length);
    // ---- FIM DO DIAGNÓSTICO ----

   if (dadosTestes.length === 0) {
        alert("Você precisa completar pelo menos um bloco de 3 tentativas para ver o gráfico.");
        return; // Para a execução
    }

    const ctx = document.getElementById('grafico').getContext('2d');

    // 2. LÓGICA DO LIMITE (15 TENTATIVAS = 5 BLOCOS)
    
    const totalBlocos = dadosTestes.length; // Quantos blocos de 3 já existem.
    
    // Define o limite máximo de blocos no gráfico
    const maxBlocosNoGrafico = 5; // 15 tentativas / 3 = 5 blocos

    // Calcula o índice inicial para pegar os últimos 5 blocos
    // Math.max(0, totalBlocos - maxBlocosNoGrafico)
    // Se totalBlocos = 3:  Math.max(0, 3 - 5) = 0. (Começa do índice 0)
    // Se totalBlocos = 5:  Math.max(0, 5 - 5) = 0. (Começa do índice 0)
    // Se totalBlocos = 6:  Math.max(0, 6 - 5) = 1. (Começa do índice 1, pulando o primeiro)
    const startIndex = Math.max(0, totalBlocos - maxBlocosNoGrafico);

    // 3. PREPARAÇÃO DOS DADOS
    const labelsGrafico = [];
    const dadosMediaUsuario = [];
    const dadosLimSup = [];
    const dadosLimInf = [];

    // 4. PREENCHIMENTO DOS ARRAYS (Iterando APENAS nos últimos 5)
    
    // O loop começa do 'startIndex' e vai até o fim do array
    for (let i = startIndex; i < totalBlocos; i++) {
        
        let testeAtual = dadosTestes[i]; 

        // Chama a função para o teste de índice 'i'.
        // Isso atualizará 'media_padrao' com os limites corretos para ESTE teste.
        analisa_resultados(i); 

        // Adiciona um rótulo para o Eixo X
        // (i + 1) para contagem humana (Bloco 1, Bloco 2, etc.)
        labelsGrafico.push(`Bloco ${i + 1} (Tipo ${testeAtual.tipo})`);
        
        // Adiciona os dados para o Eixo Y
        dadosMediaUsuario.push(parseFloat(testeAtual.media));
        dadosLimSup.push(media_padrao.lim_sup);
        dadosLimInf.push(media_padrao.lim_inf);
    }

    // 5. DESTRUIR GRÁFICO ANTIGO (Obrigatório para atualizar)
    if (meuGraficoDeLinha) {
        meuGraficoDeLinha.destroy();
    }

    // 6. CRIAÇÃO DO GRÁFICO (uma única vez, com os dados dos últimos 5 blocos)
    
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
                }
            }
        }
    });
}