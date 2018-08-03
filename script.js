function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.758789, lng: 4.861524},
    zoom: 14
  });
}


ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=1f7e5c6282ec73672996167151ba172398f27573", function (reponse) {
  var stations = JSON.parse(reponse);  //passe le rendu du fichier JSON en objet javascript
    
  stations.forEach(function(station){  // récupere a chaque tour l'élément station du tableau station(s)
    marker = new google.maps.Marker({  //
      position: station.position,      //Crée a chaque boucle un marqueur avec la position définis par l'élément station.position  
      map: map,                        //
      title: station.address,
      icon : "image_vert.png",         // icone par défaut
    });
    // modification de l'icone en cas de station fermé ou 0 vélos disponible
    if(station.status != "OPEN" || station.available_bikes == 0)
    {
      marker.icon = "image_rouge.png";
    }

    // événement au click sur un marqueur
    marker.addListener('click', function(){
      //suprime la div #fenetreLoc si elle existe déja
      if(document.querySelector("#fenetreLoc")){
        document.querySelector("#fenetreLoc").remove();
      }
      var location = document.getElementById("location");

      //création d'une fenêtre qui continendra les infos de station
      var fenetreLoc = document.createElement("div");
      fenetreLoc.id="fenetreLoc";
      location.appendChild(fenetreLoc);

      //création du bouton Reserver
      var bouton = document.createElement("input");
      bouton.type = "submit";
      bouton.id = "bouton";
      bouton.value = "Reserver";
      fenetreLoc.appendChild(bouton);

      //supression du bouton en cas de station fermer ou vélo indispo
      if (station.status == "CLOSED" || station.available_bikes == 0)
      {
        document.querySelector("#bouton").remove();
      }

      //adresse de la station
      var adresse = document.createElement("div");
      adresse.className = "adresse";
      adresse.innerHTML = station.address;
      fenetreLoc.appendChild(adresse);

      //nombre de vélo dispo
      var veloDispo = document.createElement("div");
      if(station.available_bikes == 0){
        veloDispo.style.backgroundColor = "#e24e4e"
      }
      veloDispo.className = "infoStation";
      veloDispo.innerHTML = `Nombre de vélos disponible : ${station.available_bikes}`;
      fenetreLoc.appendChild(veloDispo);

      //place disponible
      var placeDispo = document.createElement("div");
      placeDispo.className = "infoStation";
      placeDispo.innerHTML = `Place de Stationement disponible : ${station.available_bike_stands}`;
      fenetreLoc.appendChild(placeDispo);

      //etat de la station
      var etatStation = document.createElement("div");
      if(station.status == "OPEN")
      {
        etatStation.style.backgroundColor = "#76e676";
      }else
      {
        etatStation.style.backgroundColor = "#e24e4e";
      }
      etatStation.className = "infoStation";
      etatStation.innerHTML = `La station est actuellement : ${station.status}`;
      fenetreLoc.appendChild(etatStation);

      //ouverture de la fenetre réservation au click sur le bouton
      bouton.addEventListener("click",function()
      {
        //supréssion des fenetreResa déja existante
        if(document.querySelector("#fenetreResa"))
        {
          document.querySelector("#fenetreResa").remove();
        }

        //création d'une fenêtre pour la reservation
        var fenetreResa = document.createElement("div");
        fenetreResa.id="fenetreResa";
        location.appendChild(fenetreResa);

        //Champ de signature avec canvas
        var champCanvas = document.createElement("canvas");
        champCanvas.id = "canvas";
        champCanvas.width ="300";
        champCanvas.height ="150";
        //
        fenetreResa.appendChild(champCanvas);

        //appel de la fonction qui permet de signé via canvas
        signature();
        
         //création du bouton Réintialiser signature
        var suppCanvas = document.createElement("input");
        suppCanvas.type = "submit";
        suppCanvas.id = "suppCanvas";
        suppCanvas.value = "Réinitialiser";
        fenetreResa.appendChild(suppCanvas);

        suppCanvas.addEventListener("click",function(){
          supp();
        });

        //création du bouton confirmation resa
        var confirmation = document.createElement("input");
        confirmation.type = "submit";
        confirmation.id = "confirmation";
        confirmation.value = "Valider la réservation";
        fenetreResa.appendChild(confirmation);

        //lancement du timer lors de la validation
        confirmation.addEventListener("click",function(){ 
          //si une réservation et déja effectuer on stop le timer
          if(sessionStorage.length != 0 )
          {
            clearInterval(x);
          }
          //supprime toute les sessions pour initialiser une nouvelle
          sessionStorage.clear();
          //recupération de l'adresse d'une station dans une session
          sessionStorage.setItem("adresse",station.address);
          timer();
          //suppression du bouton confirmation
          document.getElementById("confirmation").remove();
        });
      });

    });//fin de l'événement click sur un marqueur

  });//fin de la boucle forEach

  //lancement du timer au rafraichissement de la page 
  if(sessionStorage.getItem("finResa"))
    {
      timer();
    }

});//fin de la fonction ajaxGet



