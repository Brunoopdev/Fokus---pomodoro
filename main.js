/*
Buscando os itens no HTML e os colocando em variaveis no JS.
*/ 
const html = document.querySelector('html');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBT = document.querySelector('#start-pause'); 
const tempoNaTela = document.querySelector('#timer');
let logicaTextoTela = 0;

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaZerado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// funções de clique para mudar a imagem e a cor de fundo.

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBT.addEventListener('click',() =>{
    tempoDecorridoEmSegundos = 1500;
    mudaContexto('foco');
    focoBT.classList.add('active');
    zerar();
})

curtoBT.addEventListener('click',() =>{
    tempoDecorridoEmSegundos = 300;
    mudaContexto('descanso-curto');
    curtoBT.classList.add('active');
    zerar();
})

longoBT.addEventListener('click',() =>{
    tempoDecorridoEmSegundos = 900;
    mudaContexto('descanso-longo');
    longoBT.classList.add('active');
    zerar();
})

//função para otimizar as funções de mudança de imagem e cor de fundo, fazendo-se mais dinâmicas.
function mudaContexto(contexto){
    mostrarTempo();

    botoes.forEach((contexto) =>{
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície,<br>
                                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    tempoDecorridoEmSegundos --
    mostrarTempo();

    if(tempoDecorridoEmSegundos <= 0){
        musicaZerado.play();
        alert('tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
}

startPauseBT.addEventListener('click',  () =>{
    iniciarOuPausar();
})

function iniciarOuPausar(){

    if(intervaloId){
        mudaTextoBT();
        musicaPause.play();
        zerar();
        return;
    }
    
    mudaTextoBT();
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000)
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}

function mudaTextoBT(){
    if(logicaTextoTela === 0){
        startPauseBT.innerHTML = `<img class="app__card-primary-butto-icon" src="./imagens/pause.png" alt=""><span>Pausar</span>`;
        logicaTextoTela ++
    }else{
        startPauseBT.innerHTML = `<img class="app__card-primary-butto-icon" src="./imagens/play_arrow.png" alt=""><span>Começar</span>`;
        logicaTextoTela--;
    }
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}` 
}


mostrarTempo();