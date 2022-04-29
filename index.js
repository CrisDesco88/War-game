const newDeckBtn = document.getElementById('newdeck-btn');
const drawBtn = document.getElementById('draw-btn');
const firstCard = document.getElementById('first-card');
const secondCard = document.getElementById('second-card');
const winnerTitle = document.querySelector('.winner-title');
const remainingCards = document.querySelector('.remaining-cards-container');
const player1ScoreEl = document.getElementById('player1-score');
const player2ScoreEl = document.getElementById('player2-score');
const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
let deckId = "";
let player1Score;
let player2Score;


function getCards(){
    player1Score = 0;
    player2Score = 0;
    drawBtn.disabled = false;
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id;
        remainingCards.innerHTML = `
            <h2>Remaining cards: ${data.remaining}<h2>
        `;
    })  
}

function drawCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        
        let card1 = data.cards[0];
        let card2 = data.cards[1];
        console.log(data.cards);
        
        firstCard.innerHTML = `
        <img class='card-image' src='${card1.image}'>
        `
        secondCard.innerHTML = `
        <img class='card-image' src='${card2.image}'>
        `
        let card1Power = valueOptions.findIndex(item => item === card1.value);
        let card2Power = valueOptions.findIndex(item => item === card2.value);
        
        const winnerText = compare(card1Power, card2Power);
        console.log(winnerText);
        winnerTitle.textContent = winnerText;

        remainingCards.innerHTML = `
            <h2>Remaining cards: ${data.remaining}<h2>
        `;

        if(data.remaining === 0) {
            drawBtn.disabled = true;
            checkWinner();
        }

        
    
    })
}

newDeckBtn.addEventListener('click', getCards);
drawBtn.addEventListener('click', drawCards);

function compare(power1, power2){
    if(power1 > power2) {
        player1Score++
        player1ScoreEl.textContent = `Player 1 score: ${player1Score}`
        return'Player 1 wins!';
    } else if(power1 < power2) {
        player2Score++
        player2ScoreEl.textContent = `Player 2 score: ${player2Score}`
        return 'Player 2 wins!';
    } else {
        return 'War!'
    }
}

function checkWinner() {
    if(player1Score > player2Score){
        winnerTitle.textContent = "The game winner is Player 1"
    } else if(player1Score < player2Score) {
        winnerTitle.textContent = "The game winner is Player 2"
    } else {
        winnerTitle.textContent = "The game has no winners"
    }
}



