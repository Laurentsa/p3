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

    },
}

var slider = Object.create(slider);
slider.init();