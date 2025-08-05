// Variáveis da bolinha
let xBolinha;
let yBolinha;
let diametro = 20;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis das raquetes
let raqueteComprimento = 10;
let raqueteAltura = 100;

let xMinhaRaquete;
let yMinhaRaquete;

let xOponenteRaquete;
let yOponenteRaquete;

// Variáveis das barras
let barraAltura = 20;

// Variáveis do placar
let placarJogador1 = 0;
let placarJogador2 = 0;

function setup() {
  createCanvas(1280, 720);
  iniciarPosicoes();
}

function draw() {
  background(33);

  desenharBarras();
  desenharPlacar();
  actorBolinha();
  minhaRaquete();
  raqueteOponente();
  colisaoRaquetes();
}

// ---------------------------
// Função de iniciar posições
function iniciarPosicoes() {
  // Bolinha no centro
  xBolinha = width / 2;
  yBolinha = height / 2;

  // Minha raquete (esquerda)
  xMinhaRaquete = 30;
  yMinhaRaquete = height / 2 - raqueteAltura / 2;

  // Raquete do oponente (direita)
  xOponenteRaquete = width - 30 - raqueteComprimento;
  yOponenteRaquete = height / 2 - raqueteAltura / 2;
}

// ---------------------------
// Desenha as barras superior e inferior
function desenharBarras() {
  fill(255);
  rect(0, 0, width, barraAltura); // Barra superior
  rect(0, height - barraAltura, width, barraAltura); // Barra inferior
}

// ---------------------------
// Desenha o placar
function desenharPlacar() {
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text(`${placarJogador1}  x  ${placarJogador2}`, width / 2, 80);
}

// ---------------------------
// Bolinha
function actorBolinha() {
  fill(255);
  circle(xBolinha, yBolinha, diametro);

  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;

  // Colisão com barra superior
  if (yBolinha - diametro / 2 <= barraAltura) {
    velocidadeYBolinha *= -1;
    yBolinha = barraAltura + diametro / 2;
  }

  // Colisão com barra inferior
  if (yBolinha + diametro / 2 >= height - barraAltura) {
    velocidadeYBolinha *= -1;
    yBolinha = height - barraAltura - diametro / 2;
  }

  // Se passar da lateral direita -> Ponto para Jogador 1
  if (xBolinha > width) {
    placarJogador1++;
    resetarBolinha();
  }

  // Se passar da lateral esquerda -> Ponto para Jogador 2
  if (xBolinha < 0) {
    placarJogador2++;
    resetarBolinha();
  }
}

function resetarBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadeXBolinha *= -1; // Volta na direção do jogador que tomou o ponto
}

// ---------------------------
// Minha raquete
function minhaRaquete() {
  fill(255);
  rect(xMinhaRaquete, yMinhaRaquete, raqueteComprimento, raqueteAltura);

  if (keyIsDown(87) && yMinhaRaquete > barraAltura) { // Tecla W
    yMinhaRaquete -= 5;
  }

  if (keyIsDown(83) && yMinhaRaquete + raqueteAltura < height - barraAltura) { // Tecla S
    yMinhaRaquete += 5;
  }
}

// ---------------------------
// Raquete do oponente
function raqueteOponente() {
  fill(255);
  rect(xOponenteRaquete, yOponenteRaquete, raqueteComprimento, raqueteAltura);

  if (keyIsDown(UP_ARROW) && yOponenteRaquete > barraAltura) {
    yOponenteRaquete -= 5;
  }

  if (keyIsDown(DOWN_ARROW) && yOponenteRaquete + raqueteAltura < height - barraAltura) {
    yOponenteRaquete += 5;
  }
}

// ---------------------------
// Colisão das raquetes com a bolinha
function colisaoRaquetes() {
  let colidiuMinha = collideRectCircle(
    xMinhaRaquete, yMinhaRaquete,
    raqueteComprimento, raqueteAltura,
    xBolinha, yBolinha, diametro
  );

  let colidiuOponente = collideRectCircle(
    xOponenteRaquete, yOponenteRaquete,
    raqueteComprimento, raqueteAltura,
    xBolinha, yBolinha, diametro
  );

  if (colidiuMinha || colidiuOponente) {
    velocidadeXBolinha *= -1;
  }
}

// ---------------------------
// (Opcional) Para ajustar ao redimensionamento
function windowResized() {
  resizeCanvas(1280, 720);
  iniciarPosicoes();
}
