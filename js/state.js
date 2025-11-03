/*(Onde os dados vivem): Este arquivo apenas guarda e 
exporta suas variáveis "globais", como a lista de testes e as infos do usuário. */

//Vetor para armazenar os testes
//tipo 1: TRS visual
//tipo 2: TRS auditiva
//tipo 3: TRE
//tipo 4: TRD

//Todas essas variáveis precisam ser armazenadas no cartao SD, por enquanto elas estão sendo 
// armazenadas localmente 

//Armazena os usuários em si 
export let infoUsuario = JSON.parse(localStorage.getItem('dadosUsuario')) || null;

// Média para cada caso específico - NÃO PRECISA ARMAZENAR NO SD.
// Esta é uma variável de cálculo temporária.
export let media_padrao = {
            lim_inf: 0,
            lim_sup: 0
};