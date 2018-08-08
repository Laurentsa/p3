var slider = {

    index : 0,
    tableauImage : [
        "images/bg1.jpg",
        "images/bg2.jpg",
    ],
    
    alt : "image du slider",
    width : "100%",
    height : "500px",

    init : function(){

        //creation de la balise <img>
        var image = document.createElement("img");
        document.querySelector("#slider").appendChild(image);
        image.src = this.tableauImage[this.index];
        image.alt = this.alt;
        image.style.width = this.width;
        image.style.height = this.height;

        //bouton gauche droit
        var bouton = document.createElement("button");
        bouton.id = "gauche";
        bouton.innerHTML = "precedent";
        document.querySelector("#slider").appendChild(bouton);

        var bouton = document.createElement("button");
        bouton.id = "droit";
        bouton.innerHTML = "suivant";
        document.querySelector("#slider").appendChild(bouton);

        this.slideDroit(image);


    },

    slideDroit : function(image){
        myThis = this;
        document.querySelector("#droit").addEventListener("click",function(){

            if (myThis.index == myThis.tableauImage.length-1){
                myThis.index = 0;
            }else{
                myThis.index ++;
            }
            image.src = myThis.tableauImage[myThis.index];
            
        });
    },
}

var slider = Object.create(slider);
slider.init();