/*(O que manipula os dados): Funções que recebem dados, fazem cálculos ou atualizam o 
state. armazenar_testes e analisa_resultados vivem aqui. */

//------------------------------------------------------------------------------------------------

import { infoUsuario, media_padrao } from './state.js';
import { mostrarHistorico } from './ui.js';

//------------------------------------------------------------------------------------------------
//Armazena as informações dadas no login pelo usuário 
//Status: funcionando 
// !!!!!!!!!!!!!!!!!!!!!Precisa enviar as informações de cadastro para o cartão SD!!!!!!!!!!!!!!!!!!!!!
// linha 91 precisa salvar no cartao 
// localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios));
export async function armazenar_info_usuario(){
    
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

    const novoUsuario = {
        nome: nome,
        idade: parseInt(idadeString),
        genero: genero,
        email: email,
        senha: senha
    };

    const ESP_IP = "http://192.168.1.10";

    try {
        // Envia os dados para o endpoint '/cadastro' no seu ESP
        const response = await fetch('/cadastro', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario) // Converte o objeto JS para uma string JSON
        });

        // Verifica se o ESP respondeu com sucesso (ex: status 200 ou 201)
        if (response.ok) {
            alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
            // Boa prática: redirecionar para 'entrar.html' após o cadastro
            window.location.href = "entrar.html"; 
        } else {
            // Se o ESP retornar um erro (ex: status 409 - Conflito)
            // Isso significa que o ESP detectou um e-mail duplicado
            const erroMsg = await response.text(); // Pega a msg de erro do ESP
            alert(`Erro no cadastro: ${erroMsg}`); // Ex: "Erro no cadastro: E-mail já existe"
        }

    } catch (error) {
        // Isso acontece se o ESP estiver offline ou houver erro de rede
        console.error("Falha ao conectar com o ESP:", error);
        alert("Não foi possível conectar ao servidor. Verifique a rede e tente novamente.");
    }
}



//------------------------------------------------------------------------------------------------

// Compara o input com as informacoes guardadas na listaUsuarios
// ver linha 130
export async function compara_informacoes_entrada(){

    // Armazena email 
    let entradaEmail = document.getElementById("email_entrar");
    const email = entradaEmail ? entradaEmail.value.trim() : "";

    // Armazena senha 
    let entradaSenha = document.getElementById("senha_entrar");
    const senha = entradaSenha ? entradaSenha.value.trim() : "";

    // 1. Verifica campos em branco
    if (email === "" || senha === "") {
        alert("Por favor, preencha o e-mail e a senha.");
        return; // Para a execução
    } 

    const ESP_IP = "http://192.168.1.10"; // <--- MUDE ESTE VALOR se necessário

    try {
        // 4. Envia os dados de login para o endpoint '/login' no ESP
        const response = await fetch(`${ESP_IP}/login`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        });

        // 5. Se o ESP disser "OK" (login e senha corretos)
        if (response.ok) {
            
            // O ESP DEVE enviar de volta o objeto do usuário (com o histórico)
            const usuarioLogado = await response.json(); 

            // --- ESTE É O "SEGREDO" ---
            // Salvamos o usuário retornado (com seu histórico)
            // no localStorage para que o resto do app possa usá-lo!
            // O resto do seu app (gráficos, etc.) funcionará como antes!
            localStorage.setItem('dadosUsuario', JSON.stringify(usuarioLogado));
            
            // Redireciona para a página principal
            window.location.href = "index.html"; 

        } else { 
            // Se o ESP disser que o login falhou (status 401, 404, etc)
            alert("E-mail ou senha incorretos. Por favor, tente novamente.");
        }

    } catch (error) {
        // Isso acontece se o ESP estiver offline
        console.error("Falha ao conectar com o ESP:", error);
        alert("Não foi possível conectar ao servidor para fazer o login.");
    }
}

//------------------------------------------------------------------------------------------------

export async function sincronizarEArmazenarTeste() {
    
    // 1. Verificação de Login
    if (!infoUsuario) {
        alert("ERRO: Você não está logado! Por favor, faça o login para salvar os testes.");
        window.location.href = "entrar.html";
        return; 
    }
    
    const ESP_IP = "http://192.168.1.10"; // <--- MUDE ESTE VALOR
    let novoTeste;

    // 2. BUSCAR o novo teste do ESP (GET)
    try {
        const responseGet = await fetch(`${ESP_IP}/get-novo-teste`); // Endpoint GET
        
        if (!responseGet.ok) {
            alert("Nenhum teste novo encontrado no cartão SD.");
            return; // Para a função se não houver teste
        }
        
        novoTeste = await responseGet.json(); // Ex: { tipo: "1", tempo: "450", media: "480" }

        // Atualiza a tela (os <span>s) com os valores recebidos
        document.getElementById("teste").textContent = novoTeste.tipo;
        document.getElementById("tempo").textContent = novoTeste.tempo;
        document.getElementById("media").textContent = novoTeste.media;

    } catch (error) {
        console.error("Erro ao BUSCAR teste do ESP:", error);
        alert("Erro ao conectar com ESP para buscar o teste.");
        return; // Para a função se houver erro
    }

    // 3. SALVAR o teste no histórico do usuário (POST)
    try {
        const responseSave = await fetch(`${ESP_IP}/salvar-teste`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: infoUsuario.email, // Diz ao ESP para qual usuário salvar
                teste: novoTeste          // O objeto {tipo, tempo, media}
            })
        });

        if (!responseSave.ok) {
            alert("Falha ao salvar o teste no Cartão SD (servidor).");
        } else {
            alert("Novo teste sincronizado e salvo com sucesso!");
            
            // 4. Atualizar a UI (Interface)
            // Adiciona o novo teste ao nosso 'cache' local
            infoUsuario.historicoTestes.push(novoTeste);
            infoUsuario.tentativas++;
            
            // Salva o 'infoUsuario' atualizado no localStorage
            localStorage.setItem('dadosUsuario', JSON.stringify(infoUsuario));
            
            // Chama a função para redesenhar a lista <ul> no HTML
            mostrarHistorico(); 
        }
    } catch (error) {
        console.error("Erro ao SALVAR teste no ESP:", error);
        alert("Erro ao conectar com ESP para salvar o teste.");
    }
}

//------------------------------------------------------------------------------------------------

//Armazena as informações dos testes 
// !!!!!!!!!!!!!!!!!!!!!Precisa receber as informações dos testes do cartão SD!!!!!!!!!!!!!!!!!!!!!
// variáveis a serem preenchidas:  inpuTeste, inputTempo, inputMedia
// Em logic.js


export async function sincronizar_novo_teste() {
    
    // 1. Verificação de Login
    if (!infoUsuario) {
        alert("ERRO: Você não está logado!");
        window.location.href = "entrar.html";
        return;
    }
    
    const ESP_IP = "http://192.168.1.10"; // <--- MUDE ESTE VALOR
    let novoTeste;

    // 2. PEDIR o novo teste ao ESP (que leu do SD)
    try {
        const response = await fetch(`${ESP_IP}/get-novo-teste`); // Endpoint GET
        if (!response.ok) {
            alert("Nenhum teste novo encontrado no cartão.");
            return;
        }
        novoTeste = await response.json(); // Ex: { tipo: "1", tempo: "450", media: "480" }

        // Atualiza a tela com os valores recebidos
        document.getElementById("teste").textContent = novoTeste.tipo;
        document.getElementById("tempo").textContent = novoTeste.tempo;
        document.getElementById("media").textContent = novoTeste.media;

    } catch (e) {
        alert("Erro ao conectar com ESP para buscar teste.");
        return;
    }

    // 3. SALVAR o teste no histórico do usuário (via ESP)
    try {
        const responseSave = await fetch(`${ESP_IP}/salvar-teste`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: infoUsuario.email, // Diz ao ESP para qual usuário salvar
                teste: novoTeste
            })
        });

        if (!responseSave.ok) {
            alert("Falha ao salvar o teste no Cartão SD.");
        } else {
            alert("Novo teste sincronizado e salvo!");
            // Opcional: atualizar o histórico local para o gráfico
            infoUsuario.historicoTestes.push(novoTeste);
            localStorage.setItem('dadosUsuario', JSON.stringify(infoUsuario));
            mostrarHistorico(); // Atualiza a UI
        }
    } catch (e) {
        alert("Erro ao conectar com ESP para salvar teste.");
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
