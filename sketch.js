//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variaveis da raquete
let raqueteComprimento = 10;
let raqueteAltura = 100;

let xMinhaRaquete = 1;
let yMinhaRaquete = 150;

let xOponenteRaquete = 590;
let yOponenteRaquete = 150;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(33);
  actorBolinha();
  minhaRaquete();
  raqueteOponente()
  colisaoMinhaRaquete();
}

//Bolinha
function actorBolinha(){
  //Cria uma bolinha
  circle(xBolinha, yBolinha , diametro);
  
  //Executa a velocidade da bolinha
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
  //Colisão da bolinha no eixo X e Y
  if(xBolinha > width || xBolinha < 0){
    velocidadeXBolinha *= -1;
  }
  
   if(yBolinha > height || yBolinha < 0){
    velocidadeYBolinha *= -1;
  }
} 

//Minha raquete
function minhaRaquete(){
  rect(xMinhaRaquete, yMinhaRaquete, raqueteComprimento, raqueteAltura);
  
  if(keyIsDown(UP_ARROW) &&  yMinhaRaquete > 0){
    yMinhaRaquete -= 5;
  }
  
  if(keyIsDown(DOWN_ARROW) &&  yMinhaRaquete < height - raqueteAltura){
    yMinhaRaquete += 5;
  }
}

//Raquete do oponente
function raqueteOponente(){
  rect(xOponenteRaquete, yOponenteRaquete, raqueteComprimento, raqueteAltura);
  
  if(keyIsDown(UP_ARROW) &&  yOponenteRaquete > 0){
    yOponenteRaquete -= 5;
  }
  
  if(keyIsDown(DOWN_ARROW) &&  yOponenteRaquete < height - raqueteAltura){
    yOponenteRaquete += 5;
  }
}

//Cria a colisão da bolinha com a raquete
function colisaoMinhaRaquete(){
  let colidiu = collideRectCircle(xMinhaRaquete, yMinhaRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha , diametro);
  
  let colidiuDois = collideRectCircle(xOponenteRaquete, yOponenteRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha , diametro);
  
  if(colidiu){
    velocidadeXBolinha *= -1;
  }
  
  if(colidiuDois){
    velocidadeXBolinha *= -1;
  }
}