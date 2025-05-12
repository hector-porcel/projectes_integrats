const INICI = 1;
const SELECTOR = 3;
const JOC = 2;
let fallos=0;
let q1, q2, q3, q4;
let qs = [];
let velocitat = 5;
let missatgesCorrectes=[MISSATGES[IDIOMA]['Ben fet'], MISSATGES[IDIOMA]['Correcte'], MISSATGES[IDIOMA]['Perfecte'], MISSATGES[IDIOMA]['Has encertat']];
let missatgesIncorrectes=[MISSATGES[IDIOMA]['Incorrecte'], MISSATGES[IDIOMA]['Torna intentar'], MISSATGES[IDIOMA]['Prova novament'], MISSATGES[IDIOMA]['Has fallat']];
let d=4;
let pantalla = INICI;

//Serial

let serial;
let latestData = "";

let dibuixarRestants = true;
let colors = [];
let colorMostrat;
let numeroCorrecte;

let missatge = "";
let tempsMissatge = 0;
let mostrarMissatge = false;
let puntuacio;

let punts;

//Imatges
let cor;
let cors;
let fons;
let leaderboardimg;
let fonsjoc;

function preload(){
  cor = loadImage('vida.png');
  fons = loadImage('portada.png');
  leaderboardimg = loadImage('leaderboard.png');
  fonsjoc = loadImage('fons.png')
  soCorrecte = loadSound('Correcte_Audio.mp3')
  soIncorrecte = loadSound('Incorrecte_Audio.mp3'); 
}

function setup() {
  
  textAlign(CENTER);
  textSize(60);
  /*
  serial = new p5.SerialPort();
  serial.open('COM3');
  serial.on('data', serialEvent);
  */

  createCanvas(1020, 800);
  frameRate(60);

  colors = generarColorsAleatoris();

  q1 = new Quadrat(0, height - 100, 100, 100, colors[0]);
  q2 = new Quadrat(width / 2 - 40, height - 100, 100, 100, colors[1]);
  q3 = new Quadrat(width - 80, height - 100, 100, 100, colors[2]);

  qs = [q1, q2, q3];

  q4 = new Quadrat(-100, height / 2 - 50, 100, 100, color(20, 200, 20));

  seleccionaColorCorrecte(d);
}

function draw() {
 
  background(fonsjoc);
  
  switch (pantalla) {
    case INICI:
      fallos=0;
      inici();
      
      break;

      case SELECTOR:
        
        selector();
        
        break;
    case JOC:
       missatgesCorrectes=[MISSATGES[IDIOMA]['Ben fet'], MISSATGES[IDIOMA]['Correcte'], MISSATGES[IDIOMA]['Perfecte'], MISSATGES[IDIOMA]['Has encertat']];
       missatgesIncorrectes=[MISSATGES[IDIOMA]['Incorrecte'], MISSATGES[IDIOMA]['Torna intentar'], MISSATGES[IDIOMA]['Prova novament'], MISSATGES[IDIOMA]['Has fallat']];

      
      joc();
      break;
    case "FINAL":
      mostrarMissatge = false;
      fallos=0;
      mostrarLeaderboard();
      break;
    default:
      break;
  }

  if (mostrarMissatge){
    if (missatge == MISSATGES[IDIOMA]['Ben fet'] || missatge == MISSATGES[IDIOMA]['Correcte'] || missatge == MISSATGES[IDIOMA]['Perfecte'] || missatge == MISSATGES[IDIOMA]['Has encertat']){
      fill (0,200,0);
    }
    else if (missatge == MISSATGES[IDIOMA]['Incorrecte'] || missatge == MISSATGES[IDIOMA]['Torna intentar'] || missatge == MISSATGES[IDIOMA]['Prova novament'] || missatge == MISSATGES[IDIOMA]['Has fallat']){
      fill(200,0,0);
    }
  }

  if (mostrarMissatge) {
    text(missatge, width / 2, height / 4);
    if (millis() - tempsMissatge > 1000) {
      mostrarMissatge = false;
    }
  }
}
function inici() {
  
  dibuixarTitol();
}

function dibuixaCinta() {
  fill(100);
  rect(0, height / 2 + 60, width, 20);

  fill(80);
  for (let i = 0; i < width; i += 40) {
    rect(i, height / 2 + 50, 20, 40);
  }
}



function xx(key) {
  if (pantalla == INICI) {
    if (key == 1) {
      pantalla = SELECTOR;
      puntuacio = 0;
      print(IDIOMA);
      loop();
    } else if (key == 2) {
      pantalla = "FINAL";
      print("Hola");
    } else if (key == 3) {
      if (IDIOMA == 0) {
        IDIOMA = 1;
      } else {
        IDIOMA = 0;
      }     
    }
  } 
  
  else if (pantalla == SELECTOR) {

      if (key == "1") {
      d=3;
      print(d);
      pantalla=JOC;
    }
    if (key == "2") {
      d=4;
      print(d);
      pantalla=JOC;
    }
    if (key == "3") {
      d=4;
      velocitat=10;
      print(d);
      pantalla=JOC;
    }

  }
  
  else if (pantalla == JOC) {      
    let numeroPremut;
    if (key == "1") {
      numeroPremut = 1;
    }
    if (key == "2") {
      numeroPremut = 2;
    }
    if (key == "3") {
      numeroPremut = 3;
    }
    if (key == "4") {
      numeroPremut = 4;
    }
    if (key == "k") {
      puntuacio+=100;
    }
    textSize(30);
    if (numeroPremut === numeroCorrecte) {
      soCorrecte.play()
      missatge = random(missatgesCorrectes);
      puntuacio++;
      
      
    } else {
      soIncorrecte.play()
      missatge = random(missatgesIncorrectes);
      fallos=fallos+1;
      print(fallos);
      
    }
    mostrarMissatge = true;
    tempsMissatge = millis();
    velocitat += 0.3;


    if (fallos==3) { // Condició per finalitzar el joc
      pantalla = "FINAL";
      finalJoc();
    } else {
      ronda();
    }
  }
  else if(pantalla=="FINAL"){
    print("P=INICI"); 
    pantalla=INICI;
   loop();

  }
  

}

function keyPressed() {
  xx(key);
}

function serialEvent() {
  let inData = serial.readLine();
  if (inData && inData.trim().length > 0) {
    latestData = inData.trim();
    let numeroRecibido = parseInt(latestData);
    if (!isNaN(numeroRecibido) && numeroRecibido === numeroCorrecte) {
      print("✅ Correcte");
    } else {
      print("❌ Incorrecte");
    }
    velocitat += 0.3;
    ronda();
  }
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



function guardarPuntuacio(nom, puntuacio) {
  let dades = JSON.parse(localStorage.getItem("leaderboard")) || [];
  dades.push({ nom, puntuacio });
  dades.sort((a, b) => b.puntuacio - a.puntuacio);
  localStorage.setItem("leaderboard", JSON.stringify(dades));
}

function mostrarLeaderboard() {
  let dades = JSON.parse(localStorage.getItem("leaderboard")) || [];
  fill(0,0,0);
  background(leaderboardimg);
  textSize(40);
  text("Leaderboard", width / 2, 100);
  textSize(30);
  for (let i = 0; i < dades.length && i < 5; i++) {
    text(`${i + 1}. ${dades[i].nom} - ${floor(dades[i].puntuacio)}`, width / 2, 200 + i * 60);
  }
}

function finalJoc() {
  noLoop();
  let nom = prompt("Introdueix el teu nom per guardar la puntuació:");
  if (nom) {
    guardarPuntuacio(nom, puntuacio);
  }
  mostrarLeaderboard();
  print(puntuacio);
}
