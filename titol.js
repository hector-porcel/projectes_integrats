

let botons;
let idioma = [["Juga.a", "Taula.s", "Idioma.d", "Morrocotudo's Boxes"], ["Juega", "Tabla", "Idioma", "Morrocotudo's Boxes"]];
let a = 0;




function dibuixarTitol() {
    botons = [
        { x:width/2-50, y:150, w: 120, h: 70, text: idioma[a][0], c: color(100, 180, 255) },
        { x:width/2-150, y:height/2, w: 120, h: 50, text: idioma[IDIOMA][1], c: color(255, 180, 100) },
        { x:width / 2+90, y:height/2, w: 100, h: 50, text: idioma[IDIOMA][2], c: color(150, 255, 150) },
        {x:width /2-100, y: 20, w: 240, h: 50, text:idioma[a] [IDIOMA],c:color(210,210,240) }
      ];
    
    background(230,240,240); 
    textSize(24);
    textAlign(CENTER, CENTER);
    noStroke();
  
    for (let boto of botons) {
      
      rect(boto.x + 2, boto.y + 4, boto.w, boto.h, 10); 
      fill(boto.c);
      rect(boto.x, boto.y, boto.w, boto.h, 10);
  
      
      fill(0);
      text(boto.text, boto.x + boto.w / 2, boto.y + boto.h / 2);
    }


    
  }


function drawButton(boto) {
  
    fill(50, 50, 50, 100);
    rect(boto.x + 4, boto.y + 6, boto.w, boto.h,12);
    
    fill(boto.c);
    rect(boto.x, boto.y, boto.w, boto.h, 12);
  
    fill(0);
    textSize(20);
    text(boto.text, boto.x + boto.w / 2, boto.y + boto.h / 2);
  }