function signature(){
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.addEventListener("mousedown",function(e){
    //on commence le dessin a chaque click de souris
    //point de départ réglé en récuperant le offset X Y de l'élément cible via (e)
    context.beginPath();
    context.moveTo(e.offsetX,e.offsetY);

    canvas.addEventListener("mousemove",dessin);
  });
  // au lacher de souris supprime l'événement pour déssiner
  canvas.addEventListener("mouseup",function(){
    canvas.removeEventListener("mousemove",dessin);
  });
}

function dessin(){
  //on crée les 2 variables x et y via la position de la souris
  //on les récupère grace a offsetX Y  
  var x = event.offsetX;
  var y = event.offsetY;
  // on commence le déssin sur les variable x y
  context.strokeStyle = "black"; //couleur de trait
  context.lineTo(x,y);  // dessine un trai de x à y
  context.lineWidth ="1";  //eppaiseur du trait
  context.stroke(); //permet de vider la figure et converser uniquement les lignes
  
};

//supprime le contenu du canvas 
function supp(){
  context.clearRect(0,0,canvas.width,canvas.height);
}