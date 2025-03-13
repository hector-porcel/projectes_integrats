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
  
}