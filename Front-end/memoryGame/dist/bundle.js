/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function startGame(boardSize) {
  const Board = __webpack_require__(/*! ./Board */ "./src/Board.js")
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

  // fetch(SERVER_URL)
  //   .then(response => response.json())
  //   .then(myJason => {
  //     serverData = myJason
  //     for(let cardId = 1; cardId <= myJason.length; cardId++)  cards.push(cardId)
  //     board = new Board(cards)
  //     board.initializeBoard(boardSize)
  //     for(let i = 0; i < 100; i++) board.shuffleBoard()
  //     board.onMatch = handleMatch
  //     board.onWrongGuess = handleWrongGuess
  //     board.onGameWon = () => gameWonElm.style.display = 'flex'
  //     renderBoard(board.board, boardElm) 
  //   })

  for(let cardId = 1; cardId <= 8; cardId++)  cards.push(cardId)
  board = new Board(cards)
  board.initializeBoard(boardSize)
  for(let i = 0; i < 100; i++) board.shuffleBoard()
  board.onMatch = handleMatch
  board.onWrongGuess = handleWrongGuess
  board.onGameWon = () => gameWonElm.style.display = 'flex'
  renderBoard(board.board, boardElm) 
  


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
      // const card = createCard(serverData[j].imgUrl)
      const card = createCard(`./images/image${j}.jpg`)
      
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQSxLO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzlDQTtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVIscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0EsK0NBQStDLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLFFBQVEsR0FBRyxRQUFRO0FBQ2hELEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNsYXNzIEJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcihjYXJkcykge1xyXG4gICAgdGhpcy5fYm9hcmQgPSBbXVxyXG4gICAgdGhpcy5fbWF0Y2hlcyA9IDBcclxuICAgIHRoaXMuX2NhcmRzID0gY2FyZHNcclxuICB9XHJcblxyXG4gIGdldCBtYXRjaGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hdGNoZXNcclxuICB9XHJcblxyXG4gIHNldCBtYXRjaGVzKG51bSkge1xyXG4gICAgdGhpcy5fbWF0Y2hlcyArPSBudW1cclxuICB9XHJcblxyXG4gIGdldCBib2FyZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ib2FyZFxyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZUJvYXJkKHNpemUpIHtcclxuICAgIGNvbnN0IGNhcmRzUXVudGl0eSA9IHRoaXMuX2NhcmRzLmxlbmd0aFxyXG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLl9ib2FyZFxyXG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLl9jYXJkc1xyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGk8IHNpemUvMjsgaSsrKXtcclxuICAgICAgYm9hcmQucHVzaChjYXJkc1tpICUgY2FyZHNRdW50aXR5XSlcclxuICAgICAgYm9hcmQucHVzaChjYXJkc1tpICUgY2FyZHNRdW50aXR5XSlcclxuICAgIH0gICBcclxuICB9XHJcblxyXG4gIHNodWZmbGVCb2FyZCgpIHtcclxuICAgIGNvbnN0IGJvYXJkID0gdGhpcy5fYm9hcmRcclxuICAgIGZvciAobGV0IGkgPSBib2FyZC5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgbGV0IGogPSB+fiAoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpXHJcbiAgICAgICAgbGV0IHggPSBib2FyZFtpXVxyXG4gICAgICAgIGJvYXJkW2ldID0gYm9hcmRbal1cclxuICAgICAgICBib2FyZFtqXSA9IHhcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrTWF0Y2goZmxpcHBlZCkge1xyXG4gICAgZmxpcHBlZFswXS5zcmMgPT09IGZsaXBwZWRbMV0uc3JjID8gdGhpcy5vbk1hdGNoKGZsaXBwZWQpIDogdGhpcy5vbldyb25nR3Vlc3MoZmxpcHBlZClcclxuICAgIHRoaXMuX21vdmVzICs9IDFcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQm9hcmRcclxuXHJcblxyXG4iLCJmdW5jdGlvbiBzdGFydEdhbWUoYm9hcmRTaXplKSB7XHJcbiAgY29uc3QgQm9hcmQgPSByZXF1aXJlKCcuL0JvYXJkJylcclxuICBjb25zdCBib2FyZEVsbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQm9hcmQnKVxyXG4gIGNvbnN0IFNFUlZFUl9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2ltYWdlcy8nXHJcbiAgbGV0IHRpbWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJylcclxuICBsZXQgc2VydmVyRGF0YSwgYm9hcmQsIGludGVydmFsSWRcclxuICBsZXQgY2FyZHMgPSBbXVxyXG4gIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydE1vZGFsJylcclxuICBsZXQgZ2FtZVdvbkVsbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lV29uJylcclxuICBsZXQgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsQ29udGVudFwiKVswXVxyXG4gIGxldCBsZXZlbDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGV2ZWwyJylcclxuICBsZXQgbGV2ZWwzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldmVsMycpXHJcbiAgbGV0IGxldmVsNCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXZlbDQnKVxyXG5cclxuICAvLyBmZXRjaChTRVJWRVJfVVJMKVxyXG4gIC8vICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIC8vICAgLnRoZW4obXlKYXNvbiA9PiB7XHJcbiAgLy8gICAgIHNlcnZlckRhdGEgPSBteUphc29uXHJcbiAgLy8gICAgIGZvcihsZXQgY2FyZElkID0gMTsgY2FyZElkIDw9IG15SmFzb24ubGVuZ3RoOyBjYXJkSWQrKykgIGNhcmRzLnB1c2goY2FyZElkKVxyXG4gIC8vICAgICBib2FyZCA9IG5ldyBCb2FyZChjYXJkcylcclxuICAvLyAgICAgYm9hcmQuaW5pdGlhbGl6ZUJvYXJkKGJvYXJkU2l6ZSlcclxuICAvLyAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSBib2FyZC5zaHVmZmxlQm9hcmQoKVxyXG4gIC8vICAgICBib2FyZC5vbk1hdGNoID0gaGFuZGxlTWF0Y2hcclxuICAvLyAgICAgYm9hcmQub25Xcm9uZ0d1ZXNzID0gaGFuZGxlV3JvbmdHdWVzc1xyXG4gIC8vICAgICBib2FyZC5vbkdhbWVXb24gPSAoKSA9PiBnYW1lV29uRWxtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAvLyAgICAgcmVuZGVyQm9hcmQoYm9hcmQuYm9hcmQsIGJvYXJkRWxtKSBcclxuICAvLyAgIH0pXHJcblxyXG4gIGZvcihsZXQgY2FyZElkID0gMTsgY2FyZElkIDw9IDg7IGNhcmRJZCsrKSAgY2FyZHMucHVzaChjYXJkSWQpXHJcbiAgYm9hcmQgPSBuZXcgQm9hcmQoY2FyZHMpXHJcbiAgYm9hcmQuaW5pdGlhbGl6ZUJvYXJkKGJvYXJkU2l6ZSlcclxuICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIGJvYXJkLnNodWZmbGVCb2FyZCgpXHJcbiAgYm9hcmQub25NYXRjaCA9IGhhbmRsZU1hdGNoXHJcbiAgYm9hcmQub25Xcm9uZ0d1ZXNzID0gaGFuZGxlV3JvbmdHdWVzc1xyXG4gIGJvYXJkLm9uR2FtZVdvbiA9ICgpID0+IGdhbWVXb25FbG0uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gIHJlbmRlckJvYXJkKGJvYXJkLmJvYXJkLCBib2FyZEVsbSkgXHJcbiAgXHJcblxyXG5cclxuICBtb2RhbENvbnRlbnQub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgc3RhcnRDbG9jaygpO1xyXG4gIH1cclxuXHJcbiAgZ2FtZVdvbkVsbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgZ2FtZVdvbkVsbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICB0aW1lci5pbm5lckhUTUwgPSAndGltZXI6IDAnXHJcbiAgICBib2FyZEVsbS5pbm5lckhUTUwgPScnXHJcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICBzdGFydEdhbWUoOClcclxuICB9XHJcblxyXG4gIGxldmVsMi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpbml0aWFsTmV3TGV2ZWwoMTIpXHJcbiAgfVxyXG5cclxuICBsZXZlbDMub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaW5pdGlhbE5ld0xldmVsKDE2KVxyXG4gIH1cclxuXHJcbiAgbGV2ZWw0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGluaXRpYWxOZXdMZXZlbCgyMClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKGZsaXBwZWRDYXJkcykge1xyXG4gICAgYm9hcmQubWF0Y2hlcyA9IDFcclxuICAgIGZsaXBwZWRDYXJkc1swXS5jbGFzc05hbWUgPSAnbWF0Y2hlZCdcclxuICAgIGZsaXBwZWRDYXJkc1sxXS5jbGFzc05hbWUgPSAnbWF0Y2hlZCcgICAgXHJcbiAgICBpZihib2FyZC5tYXRjaGVzID09PSBib2FyZFNpemUgLyAyKXtcclxuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGJvYXJkLm9uR2FtZVdvbigpLCAyMDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVXcm9uZ0d1ZXNzKGZsaXBwZWRDYXJkcyl7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZmxpcHBlZENhcmRzWzBdLmNsYXNzTmFtZSA9ICdjYXJkJ1xyXG4gICAgICBmbGlwcGVkQ2FyZHNbMV0uY2xhc3NOYW1lID0gJ2NhcmQnXHJcbiAgICB9LCA2MDApXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJCb2FyZChib2FyZCwgYm9hcmRFbG0pIHtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGNvbnN0IGogPSBib2FyZFtpXSVjYXJkcy5sZW5ndGhcclxuICAgICAgLy8gY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoc2VydmVyRGF0YVtqXS5pbWdVcmwpXHJcbiAgICAgIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKGAuL2ltYWdlcy9pbWFnZSR7an0uanBnYClcclxuICAgICAgXHJcbiAgICAgIGJvYXJkRWxtLmFwcGVuZENoaWxkKGNhcmQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVDYXJkKGltZ1VybCkge1xyXG4gICAgbGV0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICBjYXJkLmNsYXNzTmFtZSA9ICdjYXJkJ1xyXG4gICAgaW1nLnNyYyA9IGltZ1VybFxyXG4gICAgaW1nLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBmbGlwcGVkQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmxpcHBlZCcpXHJcbiAgICAgIGlmKGltZy5jbGFzc05hbWUgPT09ICdtYXRjaGVkJykgcmV0dXJuXHJcbiAgICAgIGlmKGZsaXBwZWRDYXJkcy5sZW5ndGggPCAyKSBpbWcuY2xhc3NOYW1lPSAnZmxpcHBlZCdcclxuICAgICAgZmxpcHBlZENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZsaXBwZWQnKVxyXG4gICAgICBpZihmbGlwcGVkQ2FyZHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgYm9hcmQuY2hlY2tNYXRjaChmbGlwcGVkQ2FyZHMpXHJcbiAgICAgIH1cclxuICAgIH0gICAgIFxyXG4gICAgY2FyZC5hcHBlbmRDaGlsZChpbWcpXHJcbiAgICByZXR1cm4gY2FyZFxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRDbG9jaygpIHtcclxuICAgIGxldCB0aW1lckNvdW50ZXIgPSAwXHJcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRpbWVyQ291bnRlcisrXHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVyQ291bnRlciAvIDYwKVxyXG4gICAgICAgIGxldCBzZWNvbmRzID0gdGltZXJDb3VudGVyICUgNjBcclxuICAgICAgICBpZiAoc2Vjb25kcyA8IDEwKSBzZWNvbmRzID0gXCIwXCIgKyBzZWNvbmRzXHJcblxyXG4gICAgICAgIHRpbWVyLmlubmVySFRNTCA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gXHJcbiAgICB9LCAxMDAwKVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBpbml0aWFsTmV3TGV2ZWwoc2l6ZSkge1xyXG4gICAgdGltZXIuaW5uZXJIVE1MID0gJ3RpbWVyOiAwJ1xyXG4gICAgYm9hcmRFbG0uaW5uZXJIVE1MID0nJ1xyXG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxyXG4gICAgc3RhcnRHYW1lKHNpemUpXHJcblxyXG4gIH1cclxufVxyXG5cclxuc3RhcnRHYW1lKDgpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=