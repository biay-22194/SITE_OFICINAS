/*(Onde os dados vivem): Este arquivo apenas guarda e 
exporta suas variáveis "globais", como a lista de testes e as infos do usuário. */

//Vetor para armazenar os testes
//tipo 1: TRS visual
//tipo 2: TRS auditiva
//tipo 3: TRE
//tipo 4: TRD

//Todas essas variáveis precisam ser armazenadas no cartao SD

//Armazena os usuários em si 
export let listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

// Carrega o OBJETO do usuário que está logado
// (Este objeto já contém o historicoTestes e tentativas dele)
export let infoUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || null;



//Média para cada caso específico - não sei dizer se precisa armazenar 
export let media_padrao = {
            lim_inf: 0,
            lim_sup: 0
};




/*
//supostamente n precisa
//Número de tentativas daquele usuário
export let tentativas = parseInt(localStorage.getItem('numTentativas')) || 0;
export function incrementarTentativas() {
    tentativas++;
    localStorage.setItem('numTentativas', tentativas.toString());
}

//Informações de login do usuário
export let infoUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || {
    idade: 0,
    genero: "",
    email: "",
    senha: "",
    nome: ""
};


//Armazena os dados dos testes de um certo usuário
export let dadosTestes = JSON.parse(localStorage.getItem('meusTestes')) || [];*/