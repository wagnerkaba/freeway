///////////////////////////////////////////////
//  código das imagens e sons
///////////////////////////////////////////////


// imagens do jogo
let imagemDaEstrada;
let imagemDoAtor;
let imagemCarro1;
let imagemCarro2;
let imagemCarro3;

//sons do jogo
let somDaTrilha;
let somDaColisao;
let somDoPonto;

function preload(){
    imagemDaEstrada = loadImage("imagens/estrada.png");
    imagemDoAtor = loadImage("imagens/ator-1.png");
    imagemCarro1 = loadImage("imagens/carro-1.png");
    imagemCarro2 = loadImage("imagens/carro-2.png");
    imagemCarro3 = loadImage("imagens/carro-3.png");
    imagemCarros = [imagemCarro1, imagemCarro2, imagemCarro3, imagemCarro1, imagemCarro2, imagemCarro3];

    somDaTrilha = loadSound("sons/trilha.mp3");
    somDaColisao = loadSound("sons/colidiu.mp3");
    somDoPonto = loadSound("sons/pontos.wav");
}


///////////////////////////////////////////////
//  código principal
///////////////////////////////////////////////


function setup(){
    createCanvas(500,400);
    somDaTrilha.loop();
        
}

function draw(){
    background(imagemDaEstrada);
    mostraAtor();
    mostraCarro();
    movimentaCarro();
    movimentaAtor();
    voltaPosicaoInicialDoCarro();
    verificaColisao();
    incluiPontos();
    marcaPonto();
    
    
}


///////////////////////////////////////////////
//  código do carro
///////////////////////////////////////////////

let yCarros = [40,96,150, 210, 270, 318];
let xCarros = [600, 600, 600, 600, 600, 600];
let velocidadeCarros = [2, 2.5, 3.2, 5, 3.3, 2.3];
let comprimentoCarro = 50;
let alturaCarro = 40;

function mostraCarro(){
    for (let i=0; i<imagemCarros.length; i++){
        image(imagemCarros[i], xCarros[i], yCarros[i], comprimentoCarro, alturaCarro);
    }
    

}

function movimentaCarro(){

    for (let i=0; i<imagemCarros.length; i++){
        xCarros[i] -= velocidadeCarros[i];     
    }
}

function voltaPosicaoInicialDoCarro(){

    for (let i=0; i<imagemCarros.length; i++){
        if(passouTodaTela(xCarros[i])){
            xCarros[i] = 600;
        }   
    }

}

function passouTodaTela(xCarro){
    return xCarro < - 50;
}


///////////////////////////////////////////////
//  código do ator
///////////////////////////////////////////////

//variaveis do ator
let xAtor = 85;
let yAtor = 366;
let colisao = false;
let meusPontos = 0;


function mostraAtor(){
    image(imagemDoAtor, xAtor, yAtor, 30 , 30);
}

function movimentaAtor(){
    if (keyIsDown(UP_ARROW)){
        yAtor -= 3;
    }
    if (keyIsDown(DOWN_ARROW)){
        if (podeSeMover()){
            yAtor += 3;
        }
        
    }
}

function verificaColisao(){
    for (let i=0; i<imagemCarros.length; i++){
        colisao = collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor, yAtor, 15);
        if(colisao){
            voltaAtorPosicaoInicial();
            somDaColisao.play();
            if(pontosMaiorQueZero()){
                meusPontos -=1;
            }
        }
    }
}



function incluiPontos(){
    textAlign(CENTER);
    textSize(25);
    fill(color(255,240,60));
    text(meusPontos, width/5, 27);
}

function marcaPonto(){
    if(yAtor < 15){
        meusPontos+=1;
        somDoPonto.play();
        voltaAtorPosicaoInicial();

    }
}

function voltaAtorPosicaoInicial(){
    yAtor = 366;
}

function pontosMaiorQueZero(){
    return meusPontos > 0;

}

function podeSeMover(){
    return yAtor < 366;
}