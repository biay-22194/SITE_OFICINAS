/* (O "Cérebro" que conecta tudo): Ele importa as funções dos 
outros arquivos e adiciona os event listeners (como onclick) para fazer tudo funcionar.*/

//------------------------------------------------------------------------------------------------

import { armazenar_info_usuario, armazenar_testes } from './logic.js';
import { mostrarHistorico, mostrarGraficoLinha } from './ui.js';

//------------------------------------------------------------------------------------------------

// Arquivo: login.html - pega o botão de salvar usuário do HTML
let botaoSalvar = document.getElementById("btn_salvar_usuario");
if (botaoSalvar) { // Se o botão (com esse ID) for encontrado...
    botaoSalvar.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
        armazenar_info_usuario(); // pega função do logic.js
    });
}

//------------------------------------------------------------------------------------------------

// Arquivo: testes.html - atualiza após da realização dos testes
// armazena os testes
let botaoAtualizar = document.getElementById("btn_salvar_teste");
if (botaoAtualizar) { // Se o botão (com esse ID) for encontrado...
    botaoAtualizar.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
    armazenar_testes(); // pega função do logic.js
});
}

//------------------------------------------------------------------------------------------------
// Arquivo: resultados.html 
// mostra os gráficos
let botaoMostrarGrafico = document.getElementById("btn_mostrar_grafico");
if (botaoMostrarGrafico) { // Se o botão (com esse ID) for encontrado...
    botaoMostrarGrafico.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
    mostrarGraficoLinha();
});
}

