var slider = {

    index : 0,
    tableauImage : [
        "images/bg1.jpg",
        "images/bg2.jpg",
    ],
    parent : "header",
    alt : "image du slider",
    width : "100%",
    height : "500px",

    

    init : function(){

        //creation de l'element contenant le slider
        var slider = document.createElement("div");
        slider.id = "slider";
        slider.style.color = "white";
        slider.style.fontSize = "3em";
        slider.width = this.width;
        slider.style.height = this.height;
        document.querySelector(this.parent).appendChild(slider);

        //creation de la balise <img>
        var image = document.createElement("img");
        document.querySelector("#slider").appendChild(image);
        image.src = this.tableauImage[this.index];
        image.alt = this.alt;
        image.style.width = this.width;
        image.style.height = this.height;

        //creation chevron gauche
        var gauche = document.createElement("i");
        gauche.id = "gauche";
        gauche.style.position = "relative";
        gauche.style.left = "4%";
        gauche.style.bottom = "280px";
        gauche.style.padding = "10px";
        gauche.className = "fas fa-chevron-left";
        document.querySelector("#slider").appendChild(gauche);

        //creation chevron droit
        var droit = document.createElement("i");
        droit.id = "droit";
        droit.style.position = "relative";
        droit.style.left = "90%";
        droit.style.bottom = "280px";
        droit.style.padding = "10px";
        droit.className = "fas fa-chevron-right";
        document.querySelector("#slider").appendChild(droit);
        
        this.slideDroit(image);
        this.slideGauche(image);
        this.toucheClavier(image);
        

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

    slideGauche : function(image){
        myThis = this;
        document.querySelector("#gauche").addEventListener("click",function(){

            if(myThis.index <= 0){
                myThis.index = myThis.tableauImage.length-1;
            }else{
                myThis.index --;
            }
            image.src = myThis.tableauImage[myThis.index];
            
        });
    },

    toucheClavier : function(image){
        myThis = this;
        document.addEventListener("keydown",function(e){
            
            var touche = e.keyCode;

            if(touche == 37){

                if(myThis.index <= 0){
                    myThis.index = myThis.tableauImage.length-1;
                }else{
                    myThis.index --;
                }
                image.src = myThis.tableauImage[myThis.index];
               
            };
            if (touche == 39){

                if (myThis.index == myThis.tableauImage.length-1){
                    myThis.index = 0;
                }else{
                    myThis.index ++;
                }
                image.src = myThis.tableauImage[myThis.index];

            };
        });
    },
}

var slider = Object.create(slider);
slider.init();