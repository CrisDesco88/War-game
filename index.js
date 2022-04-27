const newDeckBtn = document.getElementById('newdeck-btn');
const drawBtn = document.getElementById('draw-btn');
const firstCard = document.getElementById('first-card')
const secondCard = document.getElementById('second-card')
let deckId = "";

function getCards(){
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id;
    })  
}

function drawCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        // for (card in cards){
            
        // }
        firstCard.innerHTML = `
        <img class='card-image' src='${data.cards[0].image}'>
        
        `
        secondCard.innerHTML = `
        <img class='card-image' src='${data.cards[1].image}'>
        `
    })
}

newDeckBtn.addEventListener('click', getCards);
drawBtn.addEventListener('click', drawCards);

setTimeout(function sayHi(){
    console.log('Hello!')
}, 3000)