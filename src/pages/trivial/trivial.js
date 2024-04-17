import './trivial.css'
const trivialQuestions = [
  {
    category: 'Literatura',
    question: "¿Quién escribió la obra 'Cien años de soledad'?",
    options: [
      'Gabriel García Márquez',
      'Mario Vargas Llosa',
      'Julio Cortázar',
      'Isabel Allende'
    ],
    answer: 'Gabriel García Márquez'
  },
  {
    category: 'Música',
    question: '¿Qué instrumento tocaba Jimi Hendrix?',
    options: ['Guitarra', 'Batería', 'Piano', 'Violín'],
    answer: 'Guitarra'
  },
  {
    category: 'Cine',
    question: "¿Quién dirigió la película 'El Padrino'?",
    options: [
      'Francis Ford Coppola',
      'Martin Scorsese',
      'Steven Spielberg',
      'Alfred Hitchcock'
    ],
    answer: 'Francis Ford Coppola'
  },
  {
    category: 'Matemáticas',
    question: '¿Cuál es el resultado de 2 + 2 * 3?',
    options: ['6', '8', '10', '12'],
    answer: '8'
  },
  {
    category: 'Tecnología',
    question: '¿Qué empresa desarrolló el sistema operativo Android?',
    options: ['Google', 'Apple', 'Microsoft', 'Samsung'],
    answer: 'Google'
  },
  {
    category: 'Cultura general',
    question: '¿Cuál es el país más grande del mundo por área de tierra?',
    options: ['Rusia', 'China', 'Estados Unidos', 'Canadá'],
    answer: 'Rusia'
  },
  {
    category: 'Biología',
    question:
      '¿Qué parte del cuerpo humano es responsable de bombear la sangre?',
    options: ['Corazón', 'Pulmón', 'Hígado', 'Cerebro'],
    answer: 'Corazón'
  },
  {
    category: 'Economía',
    question: '¿Cuál es la moneda oficial de Japón?',
    options: ['Yen', 'Euro', 'Dólar', 'Libra esterlina'],
    answer: 'Yen'
  },
  {
    category: 'Política',
    question: '¿Quién fue el primer presidente de los Estados Unidos?',
    options: [
      'George Washington',
      'Thomas Jefferson',
      'Abraham Lincoln',
      'John Adams'
    ],
    answer: 'George Washington'
  },
  {
    category: 'Física',
    question:
      "¿Qué ley afirma que 'a toda acción hay una reacción igual y opuesta'?",
    options: [
      'Tercera ley de Newton',
      'Ley de la gravedad',
      'Ley de la inercia',
      'Ley de la conservación de la energía'
    ],
    answer: 'Tercera ley de Newton'
  }
]

let contador = 0
export const initTrivial = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  const divContentTrivial = document.createElement('div')
  divContentTrivial.className = 'trivialContent'
  const h2 = document.createElement('h2')
  h2.className = 'contadorTrivial'
  h2.textContent = `Tu puntuación es : ${contador}`
  divContentTrivial.appendChild(h2)

  startPreguntas(divContent, divContentTrivial, 0)
}

const startPreguntas = (divContent, divContentTrivial, preguntaActual) => {
  if (preguntaActual >= trivialQuestions.length) {
    const divFinalMessage = document.createElement('div')
    if (contador >= 300) {
      divFinalMessage.textContent = `¡Aprobado! Tu puntuación final es: ${contador}`
    } else {
      divFinalMessage.textContent = `¡Suspenso! Tu puntuación final es: ${contador}, debes superar 300`
    }
    divContentTrivial.appendChild(divFinalMessage)
    return
  }
  const trivialQuestion = trivialQuestions[preguntaActual]

  const divContainerPregunta = document.createElement('div')
  divContainerPregunta.className = 'containerPregunta'

  const divCategory = document.createElement('div')
  const h1category = document.createElement('h1')

  const divQuestion = document.createElement('div')
  const h2question = document.createElement('h2')

  const divOptions = document.createElement('div')
  divOptions.className = 'divOptions'

  const divButtonsNextOrPrev = document.createElement('div')
  divButtonsNextOrPrev.className = 'divNextPrev'
  const btnNext = document.createElement('button')
  const btnPrev = document.createElement('button')

  h1category.textContent = trivialQuestion.category
  h2question.textContent = trivialQuestion.question

  btnNext.textContent = 'Next'
  btnNext.addEventListener('click', () => {
    if (preguntaActual + 1 < trivialQuestions.length) {
      divContainerPregunta.remove()
      startPreguntas(divContent, divContentTrivial, preguntaActual + 1)
    } else {
      btnNext.disabled = true
    }
  })
  btnPrev.textContent = 'Prev'
  btnPrev.disabled = preguntaActual === 0
  btnPrev.addEventListener('click', () => {
    divContainerPregunta.remove()
    if (preguntaActual > 0) {
      startPreguntas(divContent, divContentTrivial, preguntaActual - 1)
    }
  })

  for (const option of trivialQuestion.options) {
    const buttonOptions = document.createElement('button')
    buttonOptions.textContent = option
    buttonOptions.addEventListener('click', () => {
      if (option === trivialQuestion.answer) {
        contador += 100
        divContentTrivial.querySelector(
          '.contadorTrivial'
        ).textContent = `Tu puntuación es: ${contador}`
        buttonOptions.style.backgroundColor = 'green'
        setTimeout(() => {
          divContainerPregunta.remove()
          startPreguntas(divContent, divContentTrivial, preguntaActual + 1)
        }, 200)

        console.log('¡Respuesta correcta!')
      } else {
        contador -= 100
        divContentTrivial.querySelector(
          '.contadorTrivial'
        ).textContent = `Tu puntuación es: ${contador}`
        buttonOptions.style.backgroundColor = 'red'

        setTimeout(() => {
          divContainerPregunta.remove()
          startPreguntas(divContent, divContentTrivial, preguntaActual + 1)
        }, 200)

        console.log('¡Respuesta incorrecta!')
      }
    })
    divOptions.appendChild(buttonOptions)
  }

  divCategory.appendChild(h1category)
  divQuestion.appendChild(h2question)

  divContainerPregunta.appendChild(divCategory)
  divContainerPregunta.appendChild(divQuestion)
  divContainerPregunta.appendChild(divOptions)
  divContainerPregunta.appendChild(divButtonsNextOrPrev)
  divContentTrivial.appendChild(divContainerPregunta)
  divButtonsNextOrPrev.appendChild(btnNext)
  divButtonsNextOrPrev.appendChild(btnPrev)
  divContent.appendChild(divContentTrivial)
}
