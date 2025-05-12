
function selector(){
background(fonsjoc);

textAlign(CENTER, CENTER);
textSize(64);
fill(0);
text([MISSATGES[IDIOMA]['Selecciona la dificultat']], width / 2, 60);

fill(0, 255, 0);
rect(255, 150, 510, 100);
fill(0);
textSize(44);
text([MISSATGES[IDIOMA]['Fàcil']], 510, 200);

fill(255, 165, 0);
rect(255, 350, 510, 100);
fill(0);
text([MISSATGES[IDIOMA]['Normal']], 510, 400);

fill(255, 0, 0);
rect(255, 550, 510, 100);
fill(0);
text([MISSATGES[IDIOMA]['Difícil']], 510, 600);
}