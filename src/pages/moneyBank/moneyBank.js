import './moneyBank.css'
let COUNT = 0
let intervalCron
let seconds = 60
export let intervalo
export let pausado = true

const h2cronometro = document.createElement('h2')
export const initMoney = () => {
  COUNT = 0
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''
  const audioSirena = document.createElement('audio')
  audioSirena.id = 'audioSirena'
  const audioTake = document.createElement('audio')
  audioTake.id = 'audioTake'
  const audioVictory = document.createElement('audio')
  audioVictory.id = 'audioVictory'
  const ladronImg = document.createElement('img')
  ladronImg.className = 'ladron'
  ladronImg.src =
    'https://res.cloudinary.com/dj1axfhui/image/upload/v1712132859/f1011c4a2678b65e941aa7cad1b340b4_xynywo.png'

  const textContador = document.createElement('h2')
  textContador.className = 'contador'
  textContador.textContent = COUNT

  const divButtonStart = document.createElement('div')
  divButtonStart.className = 'divButtonStart'
  const buttonPlay = document.createElement('button')
  const buttonStop = document.createElement('button')

  const divCountDown = document.createElement('div')
  divCountDown.className = 'CountDown'
  const imgPolice = document.createElement('img')
  imgPolice.src =
    'https://res.cloudinary.com/dj1axfhui/image/upload/v1712154926/59c9f91132756703729f2da481e696ee_ygioxv.png'

  h2cronometro.id = 'cronometro'
  h2cronometro.textContent = seconds

  divCountDown.appendChild(imgPolice)
  divCountDown.appendChild(h2cronometro)
  divContent.appendChild(divCountDown)

  buttonPlay.addEventListener('click', () => {
    pausado = !pausado
    playGame()
    buttonPlay.style.display = 'none'
  })
  buttonStop.addEventListener('click', () => {
    pausado = true
    clearInterval(intervalCron)
    clearInterval(intervalo)
    buttonPlay.style.display = 'block'
  })

  buttonPlay.textContent = 'PLAY'
  buttonStop.textContent = 'STOP'
  buttonPlay.id = 'buttonPlay'
  buttonStop.id = 'buttonStop'
  divButtonStart.appendChild(buttonPlay)
  divButtonStart.appendChild(buttonStop)
  divContent.appendChild(audioSirena)
  divContent.appendChild(audioTake)
  divContent.appendChild(audioVictory)
  divContent.appendChild(divButtonStart)
  divContent.appendChild(ladronImg)
  divContent.appendChild(textContador)
}
const createMoney = () => {
  if (pausado) return
  const divContent = document.querySelector('.content')

  let top = Math.random() * (innerHeight - 200)
  let left = Math.random() * (innerWidth - 300)

  const lingote = document.createElement('img')
  lingote.className = 'lingote'
  lingote.classList.add('recoger')
  lingote.src =
    'https://res.cloudinary.com/dj1axfhui/image/upload/v1712134962/10-Lingote-de-oro_yzmp7l.png'

  lingote.style.top = `${top + 150}px`
  lingote.style.left = `${left}px`
  if (window.innerWidth <= 768) {
    lingote.style.top = `${top + 333}px`
  }

  if (window.innerWidth <= 450) {
    let left = Math.random() * (innerWidth - 20)
    let top = Math.random() * (innerHeight - 20 - 300) + 150

    lingote.style.left = `${left - 20}px`
    lingote.style.top = `${top}px`
  }

  lingote.addEventListener('click', (e) => recogerLingote(e))

  divContent.appendChild(lingote)
}

const recogerLingote = (e) => {
  const audioTake = document.querySelector('#audioTake')
  audioTake.src = './assets/moneyBank/take.mp3'
  audioTake.play()
  COUNT++
  printCount(COUNT)
  e.target.classList.remove('recoger')
  e.target.classList.add('recogido')
  let randomTop = Math.random() * 20 + 200
  let randomLeft = Math.random() * 20 + 220
  e.target.style.left = `${window.innerWidth - randomLeft}px`
  e.target.style.top = `${window.innerHeight - randomTop}px`
  if (window.innerWidth <= 1024) {
    let randomLeft = Math.random() * 10 + 180
    let randomTop = Math.random() * 10 + 175
    e.target.style.left = `${window.innerWidth - randomLeft}px`
    e.target.style.top = `${window.innerHeight - randomTop}px`
  }
  if (window.innerWidth <= 450) {
    let randomLeft = Math.random() * 10 + 75
    let randomTop = Math.random() * 10 + 35
    e.target.style.left = `${window.innerWidth - randomLeft}px`
    e.target.style.top = `${window.innerHeight - randomTop}px`
  }
}
const printCount = () => {
  const text = document.querySelector('.contador')
  text.textContent = COUNT
  if (COUNT === 70) {
    pausado = true
    clearInterval(intervalo)
    clearInterval(intervalCron)

    youWin()
  }
}

const youLose = () => {
  const audioSirena = document.querySelector('#audioSirena')
  audioSirena.src = './assets/moneyBank/sirena.mp3'
  audioSirena.play()
  const divContent = document.querySelector('.content')
  const divContainerYouLose = document.createElement('div')
  divContainerYouLose.className = 'divContainerYouLose'
  const divYouLose = document.createElement('div')
  divYouLose.className = 'divYouLose'

  const divButtonYouLose = document.createElement('div')
  divButtonYouLose.className = 'divButtonYouLose'
  const cochePolicia = document.createElement('img')
  cochePolicia.id = 'cochePolicia'
  const retryButton = document.createElement('button')
  retryButton.textContent = 'RETRY'
  const exitButton = document.createElement('button')
  exitButton.textContent = 'EXIT'
  cochePolicia.src =
    'https://res.cloudinary.com/dj1axfhui/image/upload/v1712154926/8f0aae8cf8972922e783618b4cd1d535_byba0p.png'

  retryButton.addEventListener('click', () => {
    pausado = !pausado
    clearInterval(intervalCron)
    seconds = 60
    initMoney()
    playGame()
  })
  exitButton.addEventListener('click', () => {
    clearInterval(intervalCron)
    seconds = 60
    initMoney()
  })

  divYouLose.appendChild(cochePolicia)
  divButtonYouLose.appendChild(retryButton)
  divButtonYouLose.appendChild(exitButton)
  divYouLose.appendChild(divButtonYouLose)
  divContainerYouLose.appendChild(divYouLose)
  divContent.appendChild(divContainerYouLose)
}

const policeCountDown = () => {
  const h2cronometro = document.querySelector('#cronometro')

  h2cronometro.textContent = seconds

  intervalCron = setInterval(() => {
    seconds--
    h2cronometro.textContent = seconds
    if (seconds <= 0) {
      pausado = true
      clearInterval(intervalCron)
      clearInterval(intervalo)
      youLose()
    }
    if (seconds <= 20) {
      h2cronometro.style.color = 'red'
      h2cronometro.classList.add('warningH2')
    }
  }, 1000)
}

const youWin = () => {
  const audioVictory = document.querySelector('#audioVictory')
  audioVictory.src = './assets/moneyBank/victory.mp3'
  audioVictory.play()
  const divContent = document.querySelector('.content')
  const divContainerYouWin = document.createElement('div')
  divContainerYouWin.className = 'divContainerYouWin'
  const divYouWin = document.createElement('div')
  divYouWin.className = 'divYouWin'

  const divButtonYouWin = document.createElement('div')
  divButtonYouWin.className = 'divButtonYouWin'
  const ladronContento = document.createElement('img')
  ladronContento.id = 'ladronContento'
  const playAgainButton = document.createElement('button')
  playAgainButton.textContent = 'Play Again'

  ladronContento.src =
    'https://res.cloudinary.com/dj1axfhui/image/upload/v1712154988/3d-illustration-happy-villain-3d-cartoon-character-thieves-dance-under-flying-money-a-laughing-thief-celebrates-his-success-in-committing-a-crime-3d-cartoon-character-png_xqzbvu.webp'

  playAgainButton.addEventListener('click', () => {
    clearInterval(intervalCron)
    pausado = !pausado
    seconds = 60
    initMoney()
    policeCountDown()
    playGame()
  })

  divYouWin.appendChild(ladronContento)
  divButtonYouWin.appendChild(playAgainButton)
  divYouWin.appendChild(divButtonYouWin)
  divContainerYouWin.appendChild(divYouWin)
  divContent.appendChild(divContainerYouWin)
}
const playGame = () => {
  intervalo = setInterval(() => {
    createMoney()
  }, 1000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 900)
    }
  }, 5000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 800)
    }
  }, 10000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 700)
    }
  }, 15000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 600)
    }
  }, 20000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 500)
    }
  }, 25000)
  setTimeout(() => {
    clearInterval(intervalo)
    if (!pausado) {
      intervalo = setInterval(() => {
        createMoney()
      }, 450)
    }
  }, 40000)

  clearInterval(intervalCron)

  policeCountDown()
}
