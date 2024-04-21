// variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raio = diametroBolinha /2;

// variáveis velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete 
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

// variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

// placar jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetadaSom;
let pontoSom;
let trilhaSonoraSom;

function preload(){
  trilhaSonoraSom = loadSound("trilha.mp3");
  pontoSom = loadSound("ponto.mp3");
  raquetadaSom = loadSound("raquetada.mp3");

}

function setup() {
  createCanvas(600, 400);
  trilhaSonoraSom.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //movimentaRaqueteOponenteAutomatico();
  movimentaRaqueteOponenteMultiplayer()
  movimentaBolinha();
  verificaColisaoBorda();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostrarPlacar();
  marcarPontos();
}

function mostraBolinha (){
    circle (xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    // se estiver tocando a borda
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio  > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x,y){
   rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  } 
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  } 
  
  // limita a raquete para ela ñ sair da tela
  yRaquete = constrain(yRaquete, 10, 310);
}

function verificaColisaoRaquete(x, y){
 colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetadaSom.play();
  }
}

function movimentaRaqueteOponenteAutomatico(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 -30;
  yRaqueteOponente += velocidadeYOponente;
    
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
  calculaChanceDeErrar()
}

function movimentaRaqueteOponenteMultiplayer(){
     if (keyIsDown(87)){
    yRaqueteOponente -= 10
  } 
  if (keyIsDown(83)){
    yRaqueteOponente += 10
  } 
    yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);

}

function mostrarPlacar(){
  stroke (255);
  textAlign (CENTER);
  textSize(16);
  fill (color(255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255);
  text (meusPontos, 170, 26);
  fill (color(255, 140, 0));
  rect (450, 10, 40, 20);
  fill (255)
  text (pontosOponente, 470, 26);
}

function marcarPontos(){
  if (xBolinha > 590){
  meusPontos ++;
  pontoSom.play();

} else if (xBolinha < 10){
  pontosOponente ++ ;
  pontoSom.play();

  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
