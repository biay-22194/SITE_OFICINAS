/*(Onde os dados vivem): Este arquivo apenas guarda e 
exporta suas variáveis "globais", como a lista de testes e as infos do usuário. */

//Vetor para armazenar os testes
//tipo 1: TRS visual
//tipo 2: TRS auditiva
//tipo 3: TRE
//tipo 4: TRD

//Todas essas variáveis precisam ser armazenadas no cartao SD
export let dadosTestes = JSON.parse(localStorage.getItem('meusTestes')) || [];

export let tentativas = parseInt(localStorage.getItem('numTentativas')) || 0;
export function incrementarTentativas() {
    tentativas++;
    localStorage.setItem('numTentativas', tentativas.toString());
}

export let infoUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || {
    idade: 0,
    genero: ""
};

export let media_padrao = {
            lim_inf: 0,
            lim_sup: 0
};