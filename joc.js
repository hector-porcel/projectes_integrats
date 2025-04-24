function joc(){
  
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

function generarColorsAleatoris() {
  return [
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255))
  ];
}

function ronda() {
  colors = generarColorsAleatoris();

  q1.canvi(colors[0]);
  q2.canvi(colors[1]);
  q3.canvi(colors[2]);


  seleccionaColorCorrecte(d);

  q4.x = -100;

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