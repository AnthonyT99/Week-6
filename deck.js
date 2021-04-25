const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

//exporting deck so code is cleaner
//deck.js focuses on the deck
//while script is for running the game
export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }

  //Made so I dont have to keep
  //typing this.cards.length
  get numberOfCards() {
    return this.cards.length
  }

  //grabs card from top of deck
  pop() {
    return this.cards.shift()
  }

  //grabs card from bottom of deck
  push(card) {
    this.cards.push(card)
  }

  //shuffles the deck
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }
}

//Creates a brand new deck of 52 cards
//with each suit and value
function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}