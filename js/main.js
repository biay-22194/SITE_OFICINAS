/* (O "Cérebro" que conecta tudo): Ele importa as funções dos 
outros arquivos e adiciona os event listeners (como onclick) para fazer tudo funcionar.*/

//------------------------------------------------------------------------------------------------

// --- CORREÇÃO 1: Importe as funções que faltavam ---
// Assumindo que elas estão em 'logic.js' junto com as outras funções de dados
import { 
    armazenar_info_usuario, 
    compara_informacoes_entrada, 
    buscarNovosTestesDoESP,  // <--- ADICIONADO
    fazerLogout                // <--- ADICIONADO
} from './logic.js';

import { 
    armazenar_info_usuario, 
    compara_informacoes_entrada, 
    sincronizarEArmazenarTeste, // <--- NOME NOVO E CORRETO
    fazerLogout
} from './logic.js';

import { mostrarGraficoLinha } from './ui.js';

//------------------------------------------------------------------------------------------------
// Arquivo: cadastro.html - Está Perfeito
let formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
    // Ouça o evento 'submit', não o 'click'
    formCadastro.addEventListener("submit", (event) => {
        
        // --- ESTA É A LINHA MAIS IMPORTANTE ---
        // Impede que o formulário recarregue a página
        event.preventDefault(); 
        
        // Agora, chame sua função de lógica que conterá o fetch
        armazenar_info_usuario(); 
    });
}
//------------------------------------------------------------------------------------------------

// Arquivo: entrar.html - Está Perfeito
let formLogin = document.getElementById("form-login");
if (formLogin) {
    // Ouça o evento 'submit'
    formLogin.addEventListener("submit", (event) => {
        // Impede que o formulário recarregue a página
        event.preventDefault(); 
        
        // Chama a sua função de lógica de login
        compara_informacoes_entrada(); 
    });
}
//------------------------------------------------------------------------------------------------

// --- CORREÇÃO 2: O ID do botão no HTML é "btn_salvar_teste" ---
let botaoSalvarTeste = document.getElementById("btn_salvar_teste");

if (botaoSalvarTeste) {
    botaoSalvarTeste.addEventListener("click", () => {
        // Chama a função única que faz todo o trabalho
        sincronizarEArmazenarTeste(); 
    });
}
//------------------------------------------------------------------------------------------------
// Arquivo: resultados.html - Está Perfeito
let botaoMostrarGrafico = document.getElementById("btn_mostrar_grafico");
if (botaoMostrarGrafico) { // Se o botão (com esse ID) for encontrado...
    botaoMostrarGrafico.addEventListener("click", () => { // ...adicione o "ouvinte de clique"
    mostrarGraficoLinha();
});
}

//----------------------------------------------------------------------------------------------

//Arquivo: usuario.html (ou onde o 'btn_sair' estiver) - Está Perfeito (agora que importamos)
let botaoSair = document.getElementById("btn_sair");
if (botaoSair) {
    botaoSair.addEventListener("click", () => {
        fazerLogout(); // Chama a função que acabamos de criar
    });
}
