import { Header } from './src/components/header/header'
import { initMoney } from './src/pages/moneyBank/moneyBank'
import './style.css'
const divApp = document.querySelector('#app')
const divContent = document.createElement('div')
divContent.className = 'content'
Header(divApp)
divApp.appendChild(divContent)
initMoney()
