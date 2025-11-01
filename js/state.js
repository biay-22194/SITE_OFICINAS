/*(Onde os dados vivem): Este arquivo apenas guarda e 
exporta suas variáveis "globais", como a lista de testes e as infos do usuário. */

//Vetor para armazenar os testes
//tipo 1: TRS visual
//tipo 2: TRS auditiva
//tipo 3: TRE
//tipo 4: TRD
export let dadosTestes = [];
export let tentativas = 0; 
export function incrementarTentativas() {
    tentativas++;
}

export let infoUsuario = {
    idade: 0,
    genero: "",
    atleta:""
};

export let media_padrao = {
            lim_inf: 0,
            lim_sup: 0
};