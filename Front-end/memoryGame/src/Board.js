class Board {
  constructor(cards) {
    this._board = []
    this._matches = 0
    this._cards = cards
  }

  get matches() {
    return this._matches
  }

  set matches(num) {
    this._matches += num
  }

  get board() {
    return this._board
  }

  initializeBoard(size) {
    const cardsQuntity = this._cards.length
    const board = this._board
    const cards = this._cards

    for(let i = 0; i< size/2; i++){
      board.push(cards[i % cardsQuntity])
      board.push(cards[i % cardsQuntity])
    }   
  }

  shuffleBoard() {
    const board = this._board
    for (let i = board.length - 1; i > 0; i--) {
        let j = ~~ (Math.random() * (i + 1))
        let x = board[i]
        board[i] = board[j]
        board[j] = x
    }
  }

  checkMatch(flipped) {
    flipped[0].src === flipped[1].src ? this.onMatch(flipped) : this.onWrongGuess(flipped)
    this._moves += 1
  }
}

module.exports = Board


