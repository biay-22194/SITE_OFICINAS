/*(O que o usuário vê): Este arquivo contém todas as funções que mexem no HTML (DOM). 
mostrarHistorico() e sua nova função de gráfico (mostrarGraficoLinha()) vivem aqui.*/

//-----------------------------------------------------------------------------------------------

import { infoUsuario, media_padrao } from './state.js'; // <- Verifique se media_padrao está aqui
import { analisa_resultados } from './logic.js';

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

export async function mostrarGraficoLinha() {
    
    // 1. Verificação de Login
    if (!infoUsuario) {
        alert("Você precisa estar logado para ver o gráfico.");
        return; 
    }

    const ESP_IP = "http://192.168.1.10"; // <--- MUDE ESTE VALOR PARA O IP DO SEU ESP
    let historicoUsuario;

    try {
        // Pede o histórico MAIS ATUALIZADO do usuário logado
        const response = await fetch(`${ESP_IP}/get-historico?email=${infoUsuario.email}`);
        if (!response.ok) {
            alert("Não foi possível buscar o histórico do Cartão SD. Verifique o ESP.");
            return;
        }
        // O ESP retorna o usuário inteiro ou só o histórico
        const usuarioAtualizado = await response.json();
        historicoUsuario = usuarioAtualizado.historicoTestes; 
        
        // Atualiza nosso 'cache' local (infoUsuario) para manter consistente com o servidor
        // E para que outras funções (como analisa_resultados) usem os dados mais recentes
        infoUsuario.historicoTestes = historicoUsuario; // Atualiza o array diretamente
        infoUsuario.tentativas = historicoUsuario.length; // Atualiza o contador de tentativas
        localStorage.setItem('dadosUsuario', JSON.stringify(infoUsuario));

    } catch (e) {
        console.error("Erro ao conectar com ESP para buscar histórico:", e);
        alert("Erro ao conectar com ESP para buscar histórico. Verifique a conexão.");
        return;
    }

    // 2. VERIFICAR SE HÁ DADOS
    if (historicoUsuario.length === 0) {
        alert("Você ainda não possui testes no seu histórico.");
        return;
    }
    
    const ctx = document.getElementById('grafico').getContext('2d');
    
    const totalBlocos = historicoUsuario.length;
    const maxBlocosNoGrafico = 4;
    const loteAtual = Math.ceil(totalBlocos / maxBlocosNoGrafico);
    const startIndex = (loteAtual - 1) * maxBlocosNoGrafico;
    const endIndex = Math.min(loteAtual * maxBlocosNoGrafico, totalBlocos);

    // --- CORREÇÃO: Inicializar os arrays ---
    const labelsGrafico = [];
    const dadosMediaUsuario = [];
    const dadosLimSup = [];
    const dadosLimInf = [];

    // 5. PREENCHIMENTO (Iterando sobre o 'historicoUsuario' que veio do ESP)
    for (let i = startIndex; i < endIndex; i++) {
        let testeAtual = historicoUsuario[i]; 
        
        // A função 'analisa_resultados' usa o 'infoUsuario'
        // que acabamos de atualizar com os dados do servidor.
        analisa_resultados(i); // Esta função atualiza 'media_padrao'
        
        labelsGrafico.push(`Bloco ${i + 1} (Tipo ${testeAtual.tipo})`);
        
        // --- CORREÇÃO: Preencher os arrays de dados ---
        dadosMediaUsuario.push(parseFloat(testeAtual.media));
        dadosLimSup.push(media_padrao.lim_sup);
        dadosLimInf.push(media_padrao.lim_inf);
    }

    // 6. DESTRUIR GRÁFICO ANTIGO
    if (meuGraficoDeLinha) {
        meuGraficoDeLinha.destroy();
    }

    // 7. CRIAÇÃO DO GRÁFICO (com dados frescos do Cartão SD)
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
                title: {
                    display: true,
                    text: `Resultados do Lote ${loteAtual} (Tentativas ${startIndex * 3 + 1} a ${endIndex * 3})`
                }
            }
        }
    });
}