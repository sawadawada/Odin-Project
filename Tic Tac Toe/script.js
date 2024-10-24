/* Buttons */
const play = document.getElementById('play_button')
const back = document.getElementById('back_btn')
const reset = document.getElementById('reset_btn')
const playAgain = document.getElementById('playAgainButton')

/* Pages */
const firstPage = document.getElementById('first_page')
const secondPage = document.getElementById('second_page')

/* Pop up */
const message_ctn = document.getElementById('message_container')
const title = document.getElementById('title_text')

/* board */
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

/* Player */
let currentPlayer = 'X'

/* Cells */
const cells = []
for (let i = 0; i < 9; i++) {
    cells[i] = document.getElementById(i.toString())
    cells[i].addEventListener('click', function () {
        handleCellClick(i)
    })
}

/* HandleClick */
function handleCellClick(cellIndex) {
    const row = Math.floor(cellIndex / 3)
    const col = cellIndex % 3

    console.log(board)
    if (makeMove(row, col, cellIndex)) {
        if (checkWin()) {
            showMessage(`Player ${currentPlayer} wins!`, currentPlayer)
        } else if (checkTie()) {
            showMessage("It's a tie!")
        } else {
            switchPlayer()
        }
    } else {
        console.log('Invalid Move; Try Again')
    }
}
/* is Valid? */
function isValidMove(row, col) {
    return board[row][col] === ''
}

/* if is Make Move */
function makeMove(row, col, cellIndex) {
    if (isValidMove(row, col, cellIndex)) {
        board[row][col] = currentPlayer
        cells[cellIndex].textContent = currentPlayer
        return true
    }
    return false
}

/* Switch Player */
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

/* Check Tie */
function checkTie() {
    return board.flat().every((cell) => cell !== '')
}

/* Check Win */
function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === currentPlayer &&
            board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer
        )
            return true
        if (
            board[0][i] === currentPlayer &&
            board[1][i] === currentPlayer &&
            board[2][i] === currentPlayer
        )
            return true
    }
    if (
        board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer
    )
        return true
    if (
        board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer
    )
        return true

    return false
}

/* Reset Board */
function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]
    for (let i = 0; i < 9; i++) {
        cells[i].textContent = ''
    }
    currentPlayer = 'X'
}

function showMessage(message, winner = null) {
    title.textContent = message
    message_ctn.style.display = 'block'
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.second_container').classList.add('blur')
}

/* Event Listeners */

play.addEventListener('click', () => {
    firstPage.style.display = 'none'
    secondPage.style.display = 'flex'
})

back.addEventListener('click', () => {
    firstPage.style.display = 'flex'
    secondPage.style.display = 'none'
})

reset.addEventListener('click', () => {
    resetBoard()
})

playAgain.addEventListener('click', () => {
    resetBoard()
    message_ctn.style.display = 'none'
    document.querySelector('.second_container').classList.remove('blur')
    document.querySelector('.overlay').style.display = 'none';
})