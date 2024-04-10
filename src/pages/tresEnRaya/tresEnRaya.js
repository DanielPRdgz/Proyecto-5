import './tresEnRaya.css'
let fichas = ['O', 'X']
let primerTurno = true
let scorePlayer1 = 0
let scorePlayer2 = 0
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
export const initTresEnRaya = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''
  const divContentTresEnRaya = document.createElement('div')
  divContentTresEnRaya.className = 'ContenidoTresEnRaya'
  const audioPonerFicha = document.createElement('audio')
  const buttonReiniciar = document.createElement('button')
  buttonReiniciar.textContent = 'REINICIAR'
  buttonReiniciar.className = 'btnReinicio'
  buttonReiniciar.addEventListener('click', () => {
    scorePlayer1 = 0
    scorePlayer2 = 0
    h2player1.textContent = `Jugador 1:${scorePlayer1}`
    h2player2.textContent = `Jugador 2:${scorePlayer2}`
    resetearTablero()
  })
  audioPonerFicha.className = 'audioPonerFicha'
  const divTablero = document.createElement('div')
  divTablero.className = 'tablero'
  for (let index = 0; index < 9; index++) {
    const tableroBotones = document.createElement('button')
    tableroBotones.className = 'celdas'

    divTablero.appendChild(tableroBotones)
  }
  const divInfoPlayers = document.createElement('div')
  divInfoPlayers.className = 'infoPlayers'
  const h2player1 = document.createElement('h2')
  h2player1.id = 'player1'
  const h2player2 = document.createElement('h2')
  h2player2.id = 'player2'
  h2player1.textContent = `Jugador 1:${scorePlayer1}`

  h2player2.textContent = `Jugador 2:${scorePlayer2}`
  divInfoPlayers.appendChild(h2player1)
  divInfoPlayers.appendChild(h2player2)
  divContentTresEnRaya.appendChild(divTablero)
  divContent.appendChild(divInfoPlayers)
  divContent.appendChild(buttonReiniciar)
  divContent.appendChild(audioPonerFicha)
  divContent.appendChild(divContentTresEnRaya)

  startgame()
}
const startgame = () => {
  const celdas = document.querySelectorAll('.celdas')
  celdas.forEach((celda) => {
    celda.addEventListener('click', () => {
      const audioPonerFicha = document.querySelector('.audioPonerFicha')
      audioPonerFicha.src = './assets/tresEnRaya/ponerFicha.mp3'
      audioPonerFicha.play()
      if (primerTurno) {
        celda.innerHTML = fichas[0]
        celda.style.color = 'rgb(255, 205, 112)'
        primerTurno = !primerTurno
      } else {
        celda.innerHTML = fichas[1]
        celda.style.color = 'brown'
        primerTurno = true
      }
      checkWin()
    })
  })
}
const checkWin = () => {
  let estadoGanador = false
  winConditions.forEach((winCondition) => {
    const [a, b, c] = winCondition
    const celdas = document.querySelectorAll('.celdas')

    const celda1 = celdas[a].innerHTML
    const celda2 = celdas[b].innerHTML
    const celda3 = celdas[c].innerHTML

    if (celda1 !== '' && celda1 === celda2 && celda2 === celda3) {
      estadoGanador = true
      victoria(celdas)
    }
  })
  if (!estadoGanador && todasCeldasCompletas()) {
    resetearTablero()
  }
}
const victoria = (celdas) => {
  const h2player1 = document.querySelector('#player1')
  const h2player2 = document.querySelector('#player2')

  const ganador = primerTurno ? fichas[1] : fichas[0]
  if (ganador === 'O') {
    scorePlayer1++
    h2player1.classList.add('winnerRound')
  } else {
    scorePlayer2++
    h2player2.classList.add('winnerRound')
  }

  h2player1.textContent = `Jugador 1:${scorePlayer1}`
  h2player2.textContent = `Jugador 2:${scorePlayer2}`
  const tablero = document.querySelector('.tablero')

  winConditions.forEach((winCondition) => {
    const [a, b, c] = winCondition
    if (
      celdas[a].innerHTML === ganador &&
      celdas[b].innerHTML === ganador &&
      celdas[c].innerHTML === ganador
    ) {
      tablero.classList.add('agitado')
      celdas[a].classList.add('celdawinner')
      celdas[b].classList.add('celdawinner')
      celdas[c].classList.add('celdawinner')
    }
  })
  celdas.forEach((celda) => {
    setTimeout(() => {
      celda.innerHTML = ''
      h2player1.classList.remove('winnerRound')
      h2player2.classList.remove('winnerRound')
      celda.classList.remove('celdawinner')
      tablero.classList.remove('agitado')
    }, 800)
  })

  primerTurno = true
}
const resetearTablero = () => {
  const celdas = document.querySelectorAll('.celdas')
  setTimeout(() => {
    celdas.forEach((celda) => {
      celda.innerHTML = ''
    })
  }, 1000)

  primerTurno = true
}
const todasCeldasCompletas = () => {
  const celdas = document.querySelectorAll('.celdas')
  for (let i = 0; i < celdas.length; i++) {
    if (celdas[i].innerHTML === '') {
      return false
    }
  }
  return true
}
