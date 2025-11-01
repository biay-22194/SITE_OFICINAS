/*(O que manipula os dados): Funções que recebem dados, fazem cálculos ou atualizam o 
state. armazenar_testes e analisa_resultados vivem aqui. */

import { dadosTestes, infoUsuario, tentativas, incrementarTentativas,  media_padrao } from './state.js';
import { mostrarHistorico } from './ui.js';

//Armazena as informações dadas no login pelo usuário 
export function armazenar_info_usuario(){
    
    //Armazena nome
    let inputNome = document.getElementById("inputNome")
    const nome = inputNome.value.trim()
    //alert(nome)

    //Armazena email 
    let inputEmail = document.getElementById("inputEmail")
    const email = inputEmail.value
    //alert(email)

    //Armazena senha 
    let inputSenha = document.getElementById("inputSenha")
    const senha = inputSenha.value.trim()
    //alert(senha)

    //Armazena idade
    let inputIdade = document.getElementById("inputIdade")
    infoUsuario.idade = parseInt(inputIdade); 

    //Armazena gênero
    let inputGenero = document.getElementById("inputGenero")
    infoUsuario.genero = inputGenero;
    //alert(genero)

    /* Não sei se vai ter 
    let inputAtleta = document.getElementById("inputAtleta")
    infoUsuario.atleta= inputAtleta;*/
    //alert(atleta)

    //Melhorar!!!!!! verifica se os campos estão vazios, caso estivere manda um alerta 
    /*if (nome === "" || idade === "" || email === "" || senha === "" || nivel_atividade === "") {
        alert("Por favor, preencha todos os campos");
        return; // Para a execução
    }

    if (genero === "sem_valor") {
        alert("Por favor, selecione seu gênero");
        return; // Para a execução
    }*/

    //alert("Informações armazenadas! Redirecionando...");
    window.location.href = "index.html"
}

export function armazenar_testes(){

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
        
    // REVER
    if(tentativas == 0){
        // Mostra a mensagem de erro na primeira vez
        msg_atualizar_pagina.textContent = "Por favor faça uma tentativa antes de atualizar a página!";
        dadosTestes.push(novoTeste);
        incrementarTentativas();
    }
    else {
        // Nas próximas vezes, limpa a mensagem e só armazena
        msg_atualizar_pagina.textContent = ""; // Limpa a mensagem de erro
        dadosTestes.push(novoTeste);
        

    // Chama a função para redesenhar o histórico
    mostrarHistorico();
    }
}

//Tem todos os tempos de reação tabelados para comparar
export function analisa_resultados(i){
    let teste_ordem_cresc = dadosTestes[i];
    /*if(infoUsuario.atleta ==="sim"){
        if
    }*/

    //Não atleta 
    if(infoUsuario.atleta ==="sim" || infoUsuario.atleta ==="nao"){
        //TRS visual
        if(teste_ordem_cresc.inputTeste==1){
            if (infoUsuario.genero === "masculino"){
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 300;
                    media_padrao.lim_sup = 400;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 400;
                    media_padrao.lim_sup = 500;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 300;
                    media_padrao.lim_sup = 350;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 340;
                    media_padrao.lim_sup = 400;
                }

                else{
                    media_padrao.lim_inf = 650;
                    media_padrao.lim_sup = 800;
                }
            }

            else{
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 500;
                    media_padrao.lim_sup = 600;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 700;
                    media_padrao.lim_sup = 800;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 300;
                    media_padrao.lim_sup = 350;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 340;
                    media_padrao.lim_sup = 400;
                }

                else{
                    media_padrao.lim_inf = 650;
                    media_padrao.lim_sup = 700;
                }
            }
        }

        //TRS auditivo
        else if(teste_ordem_cresc.inputTeste==2){
            if (infoUsuario.genero === "masculino"){
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 350;
                    media_padrao.lim_sup = 400;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 500;
                    media_padrao.lim_sup = 600;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 400;
                    media_padrao.lim_sup = 450;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 233;
                    media_padrao.lim_sup = 760;
                }

                else{
                    media_padrao.lim_inf = 200;
                    media_padrao.lim_sup = 300;
                }
            }

            else{
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 350;
                    media_padrao.lim_sup = 400;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 900;
                    media_padrao.lim_sup = 1000;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 550;
                    media_padrao.lim_sup = 600;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 233;
                    media_padrao.lim_sup = 760;
                }

                else{
                    media_padrao.lim_inf = 200;
                    media_padrao.lim_sup = 300;
                }
            }
        }

        //TRE
        else if(teste_ordem_cresc.inputTeste==3){
            if (infoUsuario.genero === "masculino"){
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 537;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 965;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 400;
                    media_padrao.lim_sup = 500;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 500;
                    media_padrao.lim_sup = 600;
                }

                else{
                    media_padrao.lim_inf = 600;
                    media_padrao.lim_sup = 700;
                }
            }

            else{
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 537;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 965;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 500;
                    media_padrao.lim_sup = 600;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 500;
                    media_padrao.lim_sup = 600;
                }

                else{
                    media_padrao.lim_inf = 700;
                    media_padrao.lim_sup = 800;
                }
            }
        }

        //TRD
        else{
            if (infoUsuario.genero === "masculino"){
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 537;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 350;
                    media_padrao.lim_sup = 450;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 300;
                    media_padrao.lim_sup = 380;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 340;
                    media_padrao.lim_sup = 420;
                }

                else{
                    media_padrao.lim_inf = 400;
                    media_padrao.lim_sup = 600;
                }
            }

            else{
                if(infoUsuario.idade>=0 && infoUsuario.idade<=9){
                    media_padrao.lim_inf = 240;
                    media_padrao.lim_sup = 537;
                }

                else if(infoUsuario.idade>=10 && infoUsuario.idade<=19){
                    media_padrao.lim_inf = 360;
                    media_padrao.lim_sup = 460;
                }

                else if(infoUsuario.idade>=20 && infoUsuario.idade<=39){
                    media_padrao.lim_inf = 310;
                    media_padrao.lim_sup = 390;
                }

                else if(infoUsuario.idade>=40 && infoUsuario.idade<=59){
                    media_padrao.lim_inf = 350;
                    media_padrao.lim_sup = 430;
                }

                else{
                    media_padrao.lim_inf = 420;
                    media_padrao.lim_sup = 575;
                }
            }
        }

    }
}
