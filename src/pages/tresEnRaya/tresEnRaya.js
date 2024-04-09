import './tresEnRaya.css'

let fichas = ['0', 'X']
let isPlayer1 = true
let player1Wins = 0
let player2Wins = 0

export const initTresEnRaya = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const generalDiv = document.createElement('div')
  generalDiv.className = 'generalDiv'
  const contentTres = document.createElement('div')
  contentTres.className = 'tablaContainer'

  const divInfo = document.createElement('div')
  divInfo.className = 'divInfoTres'
  const title = document.createElement('h1')
  title.textContent = 'TIC TAC TOE'
  const resetButton = document.createElement('button')
  resetButton.textContent = 'RESET'
  resetButton.addEventListener('click', reset)

  const winsInfo = document.createElement('div')
  winsInfo.className = 'winsInfo'
  const player1WinsDisplay = document.createElement('p')
  player1WinsDisplay.textContent = `Player 1 Wins: ${player1Wins}`
  const player2WinsDisplay = document.createElement('p')
  player2WinsDisplay.textContent = `Player 2 Wins: ${player2Wins}`
  winsInfo.appendChild(player1WinsDisplay)
  winsInfo.appendChild(player2WinsDisplay)

  for (let index = 1; index < 10; index++) {
    const button = document.createElement('button')
    button.className = 'buttons'
    button.id = index
    contentTres.appendChild(button)
  }
  divInfo.appendChild(title)
  divInfo.appendChild(resetButton)
  generalDiv.appendChild(contentTres)

  divContent.appendChild(divInfo)
  divContent.appendChild(winsInfo)
  divContent.appendChild(generalDiv)

  const cells = document.querySelectorAll('.buttons')
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.innerHTML === '') {
        if (isPlayer1) {
          cell.innerHTML = fichas[0]
        } else {
          cell.innerHTML = fichas[1]
        }
        isPlayer1 = !isPlayer1
        check(0, 1, 2)
        check(3, 4, 5)
        check(6, 7, 8)
        check(0, 3, 6)
        check(1, 4, 7)
        check(2, 5, 8)
        check(0, 4, 8)
        check(2, 4, 6)
      }
    })
  })
}

const reset = () => {
  const cells = document.querySelectorAll('.buttons')
  cells.forEach((cell) => {
    cell.innerHTML = ''
  })
  isPlayer1 = true
}

const check = (c1, c2, c3) => {
  const cells = document.querySelectorAll('.buttons')

  const cell1 = cells[c1].innerHTML
  const cell2 = cells[c2].innerHTML
  const cell3 = cells[c3].innerHTML

  if (cell1 !== '' && cell1 === cell2 && cell2 === cell3) {
    if (cell1 === fichas[0]) {
      alert('Player 1 wins')
      player1Wins++
    } else {
      alert('Player 2 wins')
      player2Wins++
    }

    document.querySelector(
      '.winsInfo > p:nth-child(1)'
    ).textContent = `Player 1 Wins: ${player1Wins}`
    document.querySelector(
      '.winsInfo > p:nth-child(2)'
    ).textContent = `Player 2 Wins: ${player2Wins}`
    setTimeout(reset, 1000)
  }
}
