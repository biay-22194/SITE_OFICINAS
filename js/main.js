/* (O "Cérebro" que conecta tudo): Este é o seu novo script.js. Ele importa as funções dos 
outros arquivos e adiciona os event listeners (como onclick) para fazer tudo funcionar.*/

import { armazenar_info_usuario, armazenar_testes } from './logic.js';
import { mostrarHistorico, mostrarGraficoLinha } from './ui.js';


// --- EVENT LISTENERS (Ligando os botões) ---

// Pega o botão de salvar usuário do HTML
let botaoSalvar = document.getElementById("btn_salvar_usuario");
if (botaoSalvar) { // Se o botão (com esse ID) for encontrado...
    botaoSalvar.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
        armazenar_info_usuario(); // ...que vai chamar sua função.
});
}

let botaoAtualizar = document.getElementById("btn_salvar_teste");
if (botaoAtualizar) { // Se o botão (com esse ID) for encontrado...
    botaoAtualizar.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
    armazenar_testes();
});
}


