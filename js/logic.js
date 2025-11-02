/*(O que manipula os dados): Funções que recebem dados, fazem cálculos ou atualizam o 
state. armazenar_testes e analisa_resultados vivem aqui. */

//------------------------------------------------------------------------------------------------

import { listaUsuarios, infoUsuario, media_padrao } from './state.js';
import { mostrarHistorico } from './ui.js';

//------------------------------------------------------------------------------------------------

//Armazena as informações dadas no login pelo usuário 
//Status: funcionando 
// !!!!!!!!!!!!!!!!!!!!!Precisa enviar as informações de cadastro para o cartão SD!!!!!!!!!!!!!!!!!!!!!
// variáveis a serem mandadas: nome, idadeString, genero, email, senha e objeto infoUsuario
export function armazenar_info_usuario(){
    
    // Armazena nome
    let inputNome = document.getElementById("inputNome");
    const nome = inputNome ? inputNome.value.trim() : ""; 

    // Armazena idade
    let inputIdade = document.getElementById("inputIdade");
    const idadeString = inputIdade ? inputIdade.value.trim() : ""; 
    
    // Armazena gênero
    let inputGenero = document.getElementById("inputGenero");
    const genero = inputGenero ? inputGenero.value : ""; 

    // Armazena email 
    let inputEmail = document.getElementById("inputEmail");
    const email = inputEmail ? inputEmail.value.trim() : "";

    // Armazena senha 
    let inputSenha = document.getElementById("inputSenha");
    const senha = inputSenha ? inputSenha.value.trim() : "";

    // Array para armazenar mensagens de erro
    const erros = [];

    // 1. Verificação de Campos Vazios
    // Usamos 'nome', 'idadeString', 'email' e 'senha' para a verificação de vazio
    if (nome === "") {
        erros.push("Nome completo");
    }
    // Para a idade, verificamos se a string do valor está vazia
    if (idadeString === "") {
        erros.push("Idade");
    }
    if (email === "") {
        erros.push("E-mail");
    }
    if (senha === "") {
        erros.push("Senha");
    }

    // 2. Verificação do Gênero
    // O valor da opção "Selecione uma opção..." no HTML é "", então verificamos se 'genero' é "".
    if (genero === "") {
        erros.push("Gênero (seleção)");
    }

    // Lógica de Alerta
    if (erros.length > 0) {
        // Gera a mensagem de alerta com a lista de campos não preenchidos
        alert(`Por favor, preencha/selecione os seguintes campos: \n- ${erros.join('\n- ')}`);
        return; // Para a execução se houver erros
    }

    // Se o email já existe
    const emailJaExiste = listaUsuarios.find(usuario => usuario.email === email);
    if (emailJaExiste) {
        alert("Este e-mail já foi cadastrado. Por favor, use outro.");
        return;
    }

    const novoUsuario = {
        nome: nome,
        idade: parseInt(idadeString),
        genero: genero,
        email: email,
        senha: senha,
        historicoTestes: [], // O 'dadosTestes' pessoal deste usuário
        tentativas: 0        // O 'tentativas' pessoal deste usuário
    };

    // 2. Adiciona o novo usuário ao array
    listaUsuarios.push(novoUsuario);

    // 3. Salva o array ATUALIZADO de volta no localStorage
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios));

    // Redireciona para a página de ENTRAR (não para o index)
    window.location.href = "index.html";
}

//------------------------------------------------------------------------------------------------


export function compara_informacoes_entrada(){

    // Armazena email 
    let entradaEmail = document.getElementById("email_entrar");
    const email = entradaEmail ? entradaEmail.value.trim() : "";

    // Armazena senha 
    let entradaSenha = document.getElementById("senha_entrar");
    const senha = entradaSenha ? entradaSenha.value.trim() : "";

    // --- INÍCIO DO DIAGNÓSTICO ---
    // Abra o console (F12) para ver isso
    console.log("--- Tentativa de Login ---");
    console.log("Email digitado:", email);
    console.log("Senha digitada:", senha);
    console.log("Lista de usuários carregada (listaUsuarios):", listaUsuarios);
    // --- FIM DO DIAGNÓSTICO ---

    // 1. Verifica campos em branco
    if (email === "" || senha === "") {
        alert("Por favor, preencha o e-mail e a senha.");
        return; // Para a execução
    } 

    // --- LÓGICA DE LOGIN ATUALIZADA ---

    // 2. Procura na 'listaUsuarios'
    //    Usamos .toLowerCase() para tornar a busca do E-MAIL insensível ao caso.
    const usuarioEncontrado = listaUsuarios.find(usuario => 
        usuario.email.toLowerCase() === email.toLowerCase() && // <-- A CORREÇÃO ESTÁ AQUI
        usuario.senha === senha // A senha continua sensível ao caso
    );

    // 3. Verifica se o usuário foi encontrado
    if (usuarioEncontrado) {
        // SUCESSO!
        console.log("SUCESSO: Usuário encontrado:", usuarioEncontrado);
        
        // Salva os dados DESTE usuário para o resto do app usar
        localStorage.setItem('dadosUsuario', JSON.stringify(usuarioEncontrado));
        
        window.location.href = "index.html"; // Redireciona para a pág principal
    } 
    else {
        // FALHA!
        console.warn("FALHA: E-mail ou senha não correspondem.");
        alert("E-mail ou senha incorretos. Por favor, tente novamente.");
    }
}

//------------------------------------------------------------------------------------------------

//Armazena as informações dos testes 
// !!!!!!!!!!!!!!!!!!!!!Precisa receber as informações dos testes do cartão SD!!!!!!!!!!!!!!!!!!!!!
// variáveis a serem preenchidas:  inpuTeste, inputTempo, inputMedia
// enviar vetor dadosTestes
export function armazenar_testes(){

    // Se 'infoUsuario' for 'null' (ou seja, ninguém está logado)
    if (!infoUsuario) {
        alert("ERRO: Você não está logado! Por favor, faça o login para salvar os testes.");
        // Redireciona para a página de login para forçar o login
        window.location.href = "entrar.html"; // Mude para o nome da sua pág de login
        return; // Para a execução da função aqui
    }

    // (Simulação) Recebe os valores do cartão SD
    let inputTeste = document.getElementById("inputTeste").value;
    let inputTempo = document.getElementById("inputTempo").value;
    let inputMedia = document.getElementById("inputMedia").value;
    
    // Cria o objeto para o teste atual
    let novoTeste = { 
        tipo: inputTeste,
        tempo: inputTempo, 
        media: inputMedia 
    };

    const msg_atualizar_pagina = document.getElementById("msg_atualizar_pagina");
    
    // Atualiza os valores na tela (usando os <span>s)
    document.getElementById("teste").textContent = inputTeste;
    document.getElementById("tempo").textContent = inputTempo;
    document.getElementById("media").textContent = inputMedia;
    

    if(inputTeste === "" || inputTempo === "" || inputMedia === ""){
        // Mostra a mensagem de erro na primeira vez
        msg_atualizar_pagina.textContent = "Por favor faça uma tentativa antes de atualizar a página!";
    }
    else {
        // Nas próximas vezes, limpa a mensagem e só armazena
        msg_atualizar_pagina.textContent = ""; // Limpa a mensagem de erro
        infoUsuario.historicoTestes.push(novoTeste);
        // Incrementa as TENTATIVAS PESSOAIS do usuário logado
        infoUsuario.tentativas++;
        // Chama a função para redesenhar o histórico
        mostrarHistorico();

        localStorage.setItem('dadosUsuario', JSON.stringify(infoUsuario));

        const indexUsuario = listaUsuarios.findIndex(user => user.email === infoUsuario.email);
        if (indexUsuario !== -1) {
            listaUsuarios[indexUsuario] = infoUsuario; // Substitui o objeto antigo pelo novo
            // Salva a lista inteira de volta no localStorage
            localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios));
        }
    }
 
}

//------------------------------------------------------------------------------------------------

// Este objeto armazena TODAS as regras
// Formato: [idade_min, idade_max, lim_inf, lim_sup]
const LIMITES_PADRAO = {
    // Chave do Teste (Tipo "1")
    '1': { 
        'masculino': [
            [0, 9, 240, 537],    // Faixa 1
            [10, 19, 240, 965],  // Faixa 2
            [20, 39, 300, 350],  // Faixa 3 (Exemplo)
            [40, 59, 340, 400],  // Faixa 4 (Exemplo)
            [60, 130, 650, 800]  // Faixa 5 (Exemplo, 999 = "ou mais")
        ],
        'feminino': [
            [0, 9, 240, 537],    // (Valores de exemplo)
            [10, 19, 240, 965],
            [20, 39, 300, 350],
            [40, 59, 340, 400],
            [60, 130, 650, 800]
        ]
    },
    // Chave do Teste (Tipo "2")
    '2': { 
        'masculino': [
            [0, 9, 350, 400],    // Faixa 1
            [10, 19, 500, 600],  // Faixa 2
            [20, 39, 400, 450],  // Faixa 3 (Exemplo)
            [40, 59, 233, 760],  // Faixa 4 (Exemplo)
            [60, 130, 200, 300]  // Faixa 5 (Exemplo, 999 = "ou mais")
        ],
        'feminino': [
            [0, 9, 350, 400],    // (Valores de exemplo)
            [10, 19, 900, 1000],
            [20, 39, 550, 600],
            [40, 59, 233, 760],
            [60, 130, 200, 300]
        ]
    },
    '3': { 
        'masculino': [
            [0, 9, 240, 537],    // Faixa 1
            [10, 19, 240, 965],  // Faixa 2
            [20, 39, 400, 500],  // Faixa 3 (Exemplo)
            [40, 59, 500, 600],  // Faixa 4 (Exemplo)
            [60, 130, 600, 700]  // Faixa 5 (Exemplo, 999 = "ou mais")
        ],
        'feminino': [
            [0, 9, 240, 537],    // (Valores de exemplo)
            [10, 19, 240, 965],
            [20, 39, 500, 600],
            [40, 59, 500, 600],
            [60, 130, 700, 800]
        ]
    },
    '4': { 
        'masculino': [
            [0, 9, 240, 537],    // Faixa 1
            [10, 19, 350, 450],  // Faixa 2
            [20, 39, 300, 380],  // Faixa 3 (Exemplo)
            [40, 59, 340, 420],  // Faixa 4 (Exemplo)
            [60, 130, 650, 800]  // Faixa 5 (Exemplo, 999 = "ou mais")
        ],
        'feminino': [
            [0, 9, 240, 537],    // (Valores de exemplo)
            [10, 19, 360, 460],
            [20, 39, 310, 390],
            [40, 59, 350, 430],
            [60, 130, 420, 570]
        ]
    },
};

export function analisa_resultados(i){
    let teste_ordem_cresc = infoUsuario.historicoTestes[i];
    
    // Pega o tipo de teste, gênero e idade (garante que idade seja número)
    const tipoTeste = teste_ordem_cresc .tipo; // "1", "2", etc.
    const genero = infoUsuario.genero; // "masculino", "feminino"
    const idade = parseInt(infoUsuario.idade); // Garante que é um número

    // --- Diagnóstico (Opcional, mas útil) ---
    // console.log(`Analisando: Tipo=${tipoTeste}, Genero=${genero}, Idade=${idade}`);

    // 1. Encontra as regras para este [tipo] e [genero]
    // A '?' (Optional Chaining) evita erros se o tipo ou genero não forem encontrados
    const regrasPorIdade = LIMITES_PADRAO[tipoTeste]?.[genero];

    // 2. Verifica se encontramos alguma regra
    if (!regrasPorIdade) {
        console.warn(`Não foram encontradas regras para a combinação: Tipo=${tipoTeste}, Genero=${genero}`);
        // Zera os limites para evitar usar dados antigos
        media_padrao.lim_inf = 0;
        media_padrao.lim_sup = 0;
        return; 
    }

    // 3. Itera sobre as faixas de idade para encontrar a correta
    for (const [min_idade, max_idade, lim_inf, lim_sup] of regrasPorIdade) {
        
        // Se a idade do usuário estiver DENTRO da faixa...
        if (idade >= min_idade && idade <= max_idade) {
            
            // ... define os limites e PARA a função.
            media_padrao.lim_inf = lim_inf;
            media_padrao.lim_sup = lim_sup;
            
            // --- Diagnóstico (Opcional) ---
            // console.log(`Regra encontrada: [${min_idade}-${max_idade}]. Limites: ${lim_inf}-${lim_sup}`);
            
            return; // Sucesso!
        }
    }

    // 4. Se o loop terminar e não encontrar uma faixa de idade
    console.warn(`A idade ${idade} não se encaixou em nenhuma faixa para: Tipo=${tipoTeste}, Genero=${genero}`);
    media_padrao.lim_inf = 0;
    media_padrao.lim_sup = 0;
}

//--------------------------------------------------------------------------------------------------
export function fazerLogout() {
    console.log("Fazendo logout...");
    
    // 1. Remove APENAS o 'dadosUsuario' (limpa a mesa)
    // ISSO NÃO APAGA O USUÁRIO DA 'listaUsuarios' (da estante)
    localStorage.removeItem('dadosUsuario'); 
    
    // 2. Envia o usuário de volta para a página de login
    alert("Você saiu com sucesso.");
    window.location.href = "entrar.html"; // Mude para o nome da sua pág de login
}
