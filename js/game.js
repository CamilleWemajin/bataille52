window.addEventListener('load', function () {

    let gameJsonData = document.getElementById('gameJsonData').innerText;
    gameJsonData = JSON.parse(gameJsonData) ;

    let triggerFlipAction = document.querySelectorAll('.currentCard') ;

    let playerParts = ["bot", "player"] ;
    let remainCardsNumber = document.querySelector(".remainCardsNumber span") ;

    let flipped = false ;

    let finishedGame = document.getElementById("finishedGame") ;

    let currentPointer = 0 ;

    function setNumberToCard(partName){
        let domParent = document.querySelector("." + partName + "Part .currentCard") ;
        domParent.querySelector("span").innerText = gameJsonData[partName + "Cards"][currentPointer] ;
    }

    function flipCard(){
        if (currentPointer < 26) { // sécurité pour éviter qu'un joueur ne masque le layout et cherche à cliquer la carte une fois de trop
            if (currentPointer === 0) {
                // c'est le premier clic, on peut masquer la consigne
                document.querySelector('.disclamer').style.display = "none";
            }
            flipped = true;
            for (let i = 0; i < playerParts.length; i++) {
                let domParent = document.querySelector("." + playerParts[i] + "Part");
                setNumberToCard(playerParts[i]);

                domParent.classList.add('flipped');
            }
            if (gameJsonData["botCards"][currentPointer] > gameJsonData["playerCards"][currentPointer]) {
                setPoints(document.querySelector(".botPart .points span"), document.querySelector(".playerPart .points span"));
            } else {
                setPoints(document.querySelector(".playerPart .points span"), document.querySelector(".botPart .points span"));
            }

            currentPointer++;
            let remainNewNumber = parseInt(remainCardsNumber.innerText) - 1;
            remainCardsNumber.innerText = remainNewNumber;
            if (remainNewNumber === 0) {
                finishedGame.style.display = "block";
            }
        }
    }
    function setPoints(winner,looser){
        let previous = parseInt(winner.innerText) ;
        winner.innerText = ""+ (previous + 1) ;


        let otherPlayerPoints = parseInt(looser.innerText) ;

        looser.parentNode.classList.remove('winner') ;
        winner.parentNode.classList.remove('winner') ;

        if ((previous +1) > otherPlayerPoints) {
            winner.parentNode.classList.add('winner');
        } else if ((previous +1) < otherPlayerPoints){
            looser.parentNode.classList.add('winner') ;
        }

        if (previous === 1) {
            winner.parentNode.innerHTML += "s" ;
        }
    }
    function next(){
        for (let i = 0; i < playerParts.length; i++) {
            document.querySelector("." + playerParts[i] + "Part").classList.remove('flipped');
        }
        flipped = false ;
    }

    for (let i = 0; i < triggerFlipAction.length; i++){
        triggerFlipAction[i].addEventListener('click', function (){
            if (flipped === false) {
                flipCard();
            } else {
                next();
            }
        })
    }

    document.querySelector('.playerName').innerText = gameJsonData["playerName"] ;

}) ;