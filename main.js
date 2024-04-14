
const deck = []
suiteList = ['_of_diamonds','_of_hearts','_of_spades','_of_clubs']
for(let i = 1 ; i < 14 ; i++){
    suiteList.forEach(element => {
        deck.push(i+element)
    })
}

function chooseCard(total=0, turn=1){
    console.log(total, turn)
    let card = deck[Math.floor(Math.random()*deck.length)]
    deck.splice(deck.indexOf(card),1)
    if(Number(card.slice(0,2)) >= 10){
        return_value = [10, card]
    }
    else{
        if(total < 10  && Number(card.slice(0,1)) === 1){ 
            return_value = [11, card]
        }
        else{
            return_value = [Number(card.slice(0,1)), card]
        }
    }

    if(turn === 0){
        console.log('ran')
        while(return_value[0] > 5 ){
            let card = deck[Math.floor(Math.random()*deck.length)]
            deck.splice(deck.indexOf(card),1)
            if(Number(card.slice(0,2)) >= 10){
                return_value = [10, card]
            }
            else{
                if(total < 10  && Number(card.slice(0,1)) === 1){ 
                    return_value = [11, card]
                }
                else{
                    return_value = [Number(card.slice(0,1)), card]
                }
            }
        }
    }
    return return_value
}

function addCard(player, card){
    if(player.id === "dealer-cards"){
        let command = '<img class="card" src="/cards/' + card + ".png" +  '">'
        if(player.childNodes.length === 0){
            player.innerHTML = command + '<img class="card" src="/cards/hidden.png">'
        }
        dealerString += command
    }
    else{
        if(player.childNodes.length <= 1){
            let command = '<img class="card" src="/cards/' + card + ".png" +  '">'
            player.innerHTML += command
        }else{
            let command = '<img id="playerCard" class="hidden card" src="/cards/' + card + ".png" +  '">'
            player.innerHTML += command
        }
    }   
}

function hit(){

    card = chooseCard(total=playerTotal)
    newCard = card[0]
    playerTotal += newCard
    addCard(playerCards, card[1])
    let addedCard = document.getElementById("playerCard")
    addition.innerText = " +" + newCard
    addedCard.classList.remove("hidden")
    addedCard.id = "addedCard"
    addition.classList.remove("hidden")
    addition.classList.add("show")
    setTimeout(function(){
        addition.classList.remove("show")
        addition.classList.add("hidden")
    }, 500)

    dealerAI()

    player_sum.innerText = "Player's total : " + playerTotal
    dealer_sum.innerText = "Dealer's total : ??"

    winCheck()
}

function stand(){

    let dealerMove = dealerAI()

    player_sum.innerText = "Player's total : " + playerTotal
    dealer_sum.innerText = "Dealer's total : ??"

    winCheck()
    if(dealerMove === "STAND"){
        if(dealerTotal > playerTotal){
            conclusion("Your dealer has a higher total than you! You lost :(")
        }
        else if(dealerTotal === playerTotal){
            conclusion("Your and the dealer have the same total! It's a draw!!")
        }
        else{
            conclusion("You have a higher total than your dealer! You won!!!")
        }
    }
}

function conclusion(text){
    dealerCards.innerHTML = dealerString
    dealer_sum.innerText = "Dealer's total : " + dealerTotal
    popUp.showModal()
    let popText = document.getElementById("pop_text")
    popText.innerText = text
}

function newgame(){
    popUp.close()
    location.reload()
}

function dealerAI(){

    if(dealerTotal <= 11){
        card = chooseCard(total=dealerTotal)
        dealerNewCard = card[0]
        dealerTotal += dealerNewCard
        addCard(dealerCards, card[1])
        dealer_addition.classList.remove("hidden")
        dealer_addition.classList.add("show")
        setTimeout(function(){
            dealer_addition.classList.remove("show")
            dealer_addition.classList.add("hidden")
        }, 500)
        
    }
    else if(13 >= dealerTotal > 11){
        if(Math.floor( Math.random()*2) === 1){
            card = chooseCard(total=dealerTotal)
            dealerNewCard = card[0]
            dealerTotal += dealerNewCard
            addCard(dealerCards, card[1])
            dealer_addition.classList.remove("hidden")
            dealer_addition.classList.add("show")
            setTimeout(function(){
                dealer_addition.classList.remove("show")
                dealer_addition.classList.add("hidden")
            }, 500)
        }
        else{
            return "STAND"
        }
    }
    else if(15 >= dealerTotal > 13 ){
        if(Math.floor( Math.random()*4) === 1){
            card = chooseCard(total=dealerTotal)
            dealerNewCard = card[0]
            dealerTotal += dealerNewCard
            addCard(dealerCards, card[1])
            dealer_addition.classList.remove("hidden")
            dealer_addition.classList.add("show")
            setTimeout(function(){
                dealer_addition.classList.remove("show")
                dealer_addition.classList.add("hidden")
            }, 500)
        }
        else{
            return "STAND"
        }

    }
    else if(18 >= dealerTotal > 15){
        if(Math.floor( Math.random()*6) === 1){
            card = chooseCard(total=dealerTotal)
            dealerNewCard = card[0]
            dealerTotal += dealerNewCard
            addCard(dealerCards, card[1])
            dealer_addition.classList.remove("hidden")
            dealer_addition.classList.add("show")
            setTimeout(function(){
                dealer_addition.classList.remove("show")
                dealer_addition.classList.add("hidden")
            }, 500)
        }
        else{
            return "STAND"
        }
    }
    else{
        return "STAND"
    }
}

function winCheck(){

    if(dealerTotal > 21 && playerTotal > 21){
        conclusion("Both you and dealer exceeded 21! It's a draw !")
    }
    else if(dealerTotal > 21){
        conclusion("Your dealer exceeded 21! You won !!!!")
    }
    else if(playerTotal > 21){
        conclusion("Your total exceeded 21! You lost :(")
    }
    else if(dealerTotal === 21 && playerTotal === 21){
        conclusion("Both you and the dealer reached 21! It's a draw !")
    }   
    else if(dealerTotal === 21){
        conclusion("Your dealer reached 21! You lost  :(")
    }
    else if(playerTotal === 21){
        conclusion("You reached 21 first! You won !!!")
    }
}

function openhelp(){
    helPopup.showModal()
}

function hidehelp(){
    helPopup.close()
}

let player_sum = document.getElementById("player_sum")
let dealer_sum = document.getElementById("dealer_sum")
let popUp = document.getElementById("pop_up")
let helPopup = document.getElementById("help")
let playerCards = document.getElementById("player-cards")
let dealerCards = document.getElementById("dealer-cards")
let addition = document.getElementById("addition")
let dealer_addition = document.getElementById("dealer_addition")


let firstCard = chooseCard(total=0,turn=0)
let secondCard = chooseCard(total=0,turn=0)
addCard(playerCards, firstCard[1])
addCard(playerCards, secondCard[1])

let playerTotal = firstCard[0] + secondCard[0]
player_sum.innerText = "Player's total : " + playerTotal

let dealerfirstCard = chooseCard(total=0,turn=0)
let dealersecondCard = chooseCard(total=0,turn=0)
let dealerString = ""
addCard(dealerCards, dealerfirstCard[1])
addCard(dealerCards, dealersecondCard[1])

let dealerTotal = dealerfirstCard[0] + dealersecondCard[0]
dealer_sum.innerText = "Dealer's total : ??" 
