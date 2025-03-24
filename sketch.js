const INICI = 1;
const JOC = 2;

let q1, q2, q3, q4;
let qs = [];
let velocitat = 5;

let pantalla = INICI;
//Serialll

let serial;
let latestData = "";

let dibuixarRestants = true;
let colors = [];
let colorMostrat;
let numeroCorrecte;

let missatge = "";
let tempsMissatge = 0;
let mostrarMissatge = false;

function setup() {
  textAlign(CENTER);
  textSize(30);
  
  serial = new p5.SerialPort();
  serial.open('COM3');
  serial.on('data', serialEvent);
  createCanvas(1020, 800);
  frameRate(60);

  colors = generarColorsAleatoris();

  q1 = new Quadrat(0, height - 100, 100, 100, colors[0]);
  q2 = new Quadrat(width / 2 - 40, height - 100, 100, 100, colors[1]);
  q3 = new Quadrat(width - 80, height - 100, 100, 100, colors[2]);

  qs = [q1, q2, q3];

  q4 = new Quadrat(-100, height / 2 - 50, 100, 100, color(20, 200, 20));

  seleccionaColorCorrecte();
}

function draw() {
  background(220);
  switch (pantalla) {
    case INICI:
      inici()
      break;
    case JOC:
      joc();
      break;
    default:
      break;
  }

  if (mostrarMissatge) {
    text(missatge, width / 2, height / 4);
    if (millis() - tempsMissatge > 1000) {
      mostrarMissatge = false;
    }
  }
}

function dibuixaCinta() {
  fill(100);
  rect(0, height / 2 + 60, width, 20);

  fill(80);
  for (let i = 0; i < width; i += 40) {
    rect(i, height / 2 + 50, 20, 40);
  }
}

function ronda() {
  colors = generarColorsAleatoris();

  q1.canvi(colors[0]);
  q2.canvi(colors[1]);
  q3.canvi(colors[2]);

  seleccionaColorCorrecte();

  q4.x = -100;

  dibuixarRestants = false;
}

function xx(key){
  if (pantalla == INICI){
    pantalla = JOC;
    loop();
  } else if (pantalla == JOC) {
    let numeroPremut;
    if (key == "W") {
      numeroPremut = 1;
    }
    if (key == "A") {
      numeroPremut = 2;
    }
    if (key == "S") {
      numeroPremut = 3;
    }

    if (numeroPremut === numeroCorrecte) {
      missatge = "correcte";
    } else {
      missatge = "incorrecte";
    }
    mostrarMissatge = true;
    tempsMissatge = millis();
    velocitat = velocitat + 0.3;
    ronda();
  }
}

function keyPressed() {
  xx(key);
}
function serialEvent() {
  print("Entra");
  
  let inData = serial.readLine();
  print(inData);
  if (inData && inData.trim().length > 0) { // Verifica que no sea null o vacío
    latestData = inData.trim();
    
    let numeroRecibido = parseInt(latestData);
    print("Dato recibido:", latestData);

    if (!isNaN(numeroRecibido) && numeroRecibido === numeroCorrecte) {
      print("✅ Correcto");
      //missatge = "correcte";
    } else {
      print("❌ Incorrecto");
      //missatge = "incorrecte";
    }

    velocitat += 0.3;
    ronda();
  }
}





function generarColorsAleatoris() {
  return [
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255))
  ];
}

function seleccionaColorCorrecte() {
  let index = floor(random(3));
  colorMostrat = colors[index];
  numeroCorrecte = index + 1;
  q4.canvi(colorMostrat);
}

class Quadrat {
  constructor(x, y, ample, alt, c) {
    this.x = x;
    this.y = y;
    this.ample = ample;
    this.alt = alt;
    this.color = c;
  }

  mou() {
    this.x += velocitat;
  }

  dibuixa() {
    fill(this.color);
    rect(this.x, this.y, this.ample, this.alt);
  }

  canvi(c) {
    this.color = c;

  }
}
function inici() {
  noLoop();
  text(MISSATGES[IDIOMA]['Bon dia'], width / 2, height / 2)
}