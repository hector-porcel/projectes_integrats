let q1, q2, q3, q4;
let qs = [];
let velocitat = 2;

//prova


//Daniel?


let dibuixarRestants = true;
let colors = [];
let colorMostrat;
let numeroCorrecte;
//1234
function setup() {
  createCanvas(400, 400);
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
  dibuixaCinta();

  q4.mou();
  q4.dibuixa();
  
  if (q4.x > width) {
    dibuixarRestants = true;
  } else {
    dibuixarRestants = false;
  }

  if (dibuixarRestants) {
    for (let q of qs) {
      q.dibuixa();
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

function keyPressed() {
  if (keyCode >= 49 && keyCode <= 51) {
    let numeroPremut = keyCode - 48;
    
    if (numeroPremut === numeroCorrecte) {
      print("SI");
    } else {
      print("NO");
    }
    
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
