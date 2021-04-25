import Deck from "./deck.js"

const cardValues = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}


let playerDeck, computerDeck, inRound, stop

//Wasnt sure how to make it iterate in the console
//So I used html to update it everytime you click the screen
//also updates each round
document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

//function to start game get a deck and shuffle it
startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  //Divides deck by 2 and makes it into a whole number
  //even if its an odd number hence why .ceil is used
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  //gives first half of deck to player
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  //gives second half of deck to computer 
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)) 
  inRound = false
  stop = false

  updateDeckCount()
}

//Function to reset the cards 
//for the next round
function cleanBeforeRound() {
    inRound = false;
    updateDeckCount();
  }

//function to grab the top card from
//the deck for the next round
function flipCards() {
  inRound = true
  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  //function to update the deck count
  updateDeckCount()

  //logs win in console when you win round
  if (isRoundWinner(playerCard, computerCard)) {
    console.log("Win")
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
    //logs lose in console when you lose round
  } else if (isRoundWinner(computerCard, playerCard)) {
    console.log("Lose")
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
    //logs draw in console when cards are same value
  } else {
    console.log("Draw")
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  //logs you lose if your deck reaches
  //0 cards
  if (isGameOver(playerDeck)) {
     console.log("You Lose")
    stop = true
  //logs win if comp deck reacher 0 cards
  } else if (isGameOver(computerDeck)) {
    console.log("You Win")
    stop = true
  }
}

//Updates and logs the amount of cards
//the player and comp has in thier deck
function updateDeckCount() {
    console.log("Card count:");
    console.log(
    `Computer: ${computerDeck.numberOfCards}, Player: ${playerDeck.numberOfCards}`
    );
}

//Checks which card out of the two in the
//current round is higher
function isRoundWinner(cardOne, cardTwo) {
  return cardValues[cardOne.value] > cardValues[cardTwo.value]
}

//End game when one of the decks
//hits 0 cards
function isGameOver(deck) {
  return deck.numberOfCards === 0
}