function startGame(boardSize) {
  const Board = require('./Board')
  const boardElm = document.getElementById('gameBoard')
  const SERVER_URL = 'http://localhost:3000/images/'
  let timer = document.getElementById('timer')
  let serverData, board, intervalId
  let cards = []
  let modal = document.getElementById('startModal')
  let gameWonElm = document.getElementById('gameWon')
  let modalContent = document.getElementsByClassName("modalContent")[0]
  let level2 = document.getElementById('level2')
  let level3 = document.getElementById('level3')
  let level4 = document.getElementById('level4')

  fetch(SERVER_URL)
    .then(response => response.json())
    .then(myJason => {
      serverData = myJason
      for(let cardId = 1; cardId <= myJason.length; cardId++)  cards.push(cardId)
      board = new Board(cards)
      board.initializeBoard(boardSize)
      for(let i = 0; i < 100; i++) board.shuffleBoard()
      board.onMatch = handleMatch
      board.onWrongGuess = handleWrongGuess
      board.onGameWon = () => gameWonElm.style.display = 'flex'
      renderBoard(board.board, boardElm) 
    })

  modalContent.onclick = function() {
    modal.style.display = 'none'
    startClock();
  }

  gameWonElm.onclick = () => {
    gameWonElm.style.display = 'none'
    timer.innerHTML = 'timer: 0'
    boardElm.innerHTML =''
    modal.style.display = 'flex'
    startGame(8)
  }

  level2.onclick = function() {
    initialNewLevel(12)
  }

  level3.onclick = function() {
    initialNewLevel(16)
  }

  level4.onclick = function() {
    initialNewLevel(20)
  }

  function handleMatch(flippedCards) {
    board.matches = 1
    flippedCards[0].className = 'matched'
    flippedCards[1].className = 'matched'    
    if(board.matches === boardSize / 2){
      clearInterval(intervalId)
      setTimeout(() => board.onGameWon(), 200)
    }
  }

  function handleWrongGuess(flippedCards){
    setTimeout(() => {
      flippedCards[0].className = 'card'
      flippedCards[1].className = 'card'
    }, 600)
  }

  function renderBoard(board, boardElm) {
    for(let i = 0; i < board.length; i++){
      const j = board[i]%cards.length
      const card = createCard(serverData[j].imgUrl)
      boardElm.appendChild(card)
    }
  }

  function createCard(imgUrl) {
    let card = document.createElement('div')
    let img = document.createElement('img')
    card.className = 'card'
    img.src = imgUrl
    img.onclick = () => {
      let flippedCards = document.querySelectorAll('.flipped')
      if(img.className === 'matched') return
      if(flippedCards.length < 2) img.className= 'flipped'
      flippedCards = document.querySelectorAll('.flipped')
      if(flippedCards.length === 2) {
        board.checkMatch(flippedCards)
      }
    }     
    card.appendChild(img)
    return card
  }

  function startClock() {
    let timerCounter = 0
    intervalId = setInterval(function () {
        timerCounter++
        let minutes = Math.floor(timerCounter / 60)
        let seconds = timerCounter % 60
        if (seconds < 10) seconds = "0" + seconds

        timer.innerHTML = `${minutes}:${seconds}`
    }, 1000)
  }
  
  function initialNewLevel(size) {
    timer.innerHTML = 'timer: 0'
    boardElm.innerHTML =''
    modal.style.display = 'flex'
    clearInterval(intervalId)
    startGame(size)

  }
}

startGame(8)
