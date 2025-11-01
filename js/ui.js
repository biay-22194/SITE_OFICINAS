/*(O que o usuário vê): Este arquivo contém todas as funções que mexem no HTML (DOM). 
mostrarHistorico() e sua nova função de gráfico (mostrarGraficoLinha()) vivem aqui.*/

import { dadosTestes,  media_padrao } from './state.js';
import { analisa_resultados } from './logic.js';

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

export function mostrarGraficoLinha() {
    
    if (tentativas%3==0 && tentativas%15==0){
        let i = tentativas;
        analisa_resultados(i/3);


    }

}