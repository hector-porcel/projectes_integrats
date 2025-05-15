function joc(){
    velocitat=5;
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
    dibuixarCors();
  
}

function seleccionaColorCorrecte(d) {
  let index = floor(random(d));
  colorMostrat = colors[index];
  numeroCorrecte = index + 1;
  q4.canvi(colorMostrat);
}
/*
function generarColorsAleatoris() {
  return [
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255))
  ];
}
  */
 
 function generarColorsAleatoris() {
  let c1 = color(random(255), random(255), random(255));
  let c23 = [];
  let d = 50;
  let marge = 10;
  let i = 0;

  while (i < 3) {
    let c = color(random(255), random(255), random(255));
    let dCalc = dist(red(c1), green(c1), blue(c1), red(c), green(c), blue(c));

    if (dCalc > d + marge) {
      c23[i] = c;
      i++;
    }
  }

  let c2 = c23[0];
  let c3 = c23[1];
  let c4 = c23[2];

  return [c1, c2, c3, c4];
}


function ronda() {
  colors = generarColorsAleatoris();

  q1.canvi(colors[0]);
  q2.canvi(colors[1]);
  q3.canvi(colors[2]);


  seleccionaColorCorrecte(d);

  q4.x = -500;
  

  dibuixarRestants = false;
}
function dibuixarCors() {
  let vides = 3 - fallos;
  let posX = 10;
  let posY = 20;

  for (let i = 0; i < vides; i++) {
    image(cor, posX + i * 40, posY, 30, 30); 
  }
}