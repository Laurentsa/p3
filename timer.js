function timer(){
    //on recupere la date de l'ancienne resa si il y en a une sinon on en crée une
    if(sessionStorage.getItem("finResa")){
        countDownDate = new Date(sessionStorage.getItem("finResa"));
    }else{
        // date utiliser pour le countdown
        var timeResa = new Date(); // crée un objet date avec les infos actuelle jj/mm/aaaa/hh/mn/s
        timeResa.setMinutes(timeResa.getMinutes()+20); // ajoute 20mn a l'heure actuelle
        countDownDate = new Date(timeResa); 
        sessionStorage.setItem("finResa",timeResa);
    }

    x = setInterval(function(){
        
        var now = new Date(); //date de départ du timer en miliseconde
        
        // différence entre la date voulu et l'actuelle
        var distance = countDownDate - now;
        
        // calcul des minutes et des secondes
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        
        sessionStorage.setItem("minutes", minutes);
        sessionStorage.setItem("seconds", seconds);

        document.getElementById("test").innerHTML = sessionStorage.getItem("adresse") + " "+ sessionStorage.getItem("minutes") + "m " + sessionStorage.getItem("seconds") + "s ";
        
        // Si le timer arrive a 0
        if (distance < 0 ) 
        {
            clearInterval(x);
            document.getElementById("test").innerHTML = "EXPIRED";
        }
    },1000);
    

};



