import { initMoney } from '../../pages/moneyBank/moneyBank'
import { initTresEnRaya } from '../../pages/tresEnRaya/tresEnRaya'
import { initTrivial } from '../../pages/trivial/trivial'
import './header.css'
export const Header = (divApp) => {
  const header = document.createElement('header')
  const buttonMoney = document.createElement('button')
  buttonMoney.id = 'btnMoney'
  const buttonTres = document.createElement('button')
  buttonTres.id = 'btnTres'
  const buttonTrivial = document.createElement('button')
  buttonTrivial.id = 'btnTrivial'

  buttonMoney.textContent = 'Money Catcher'
  buttonTres.textContent = 'Tres en raya'
  buttonTrivial.textContent = 'Trivial'

  buttonMoney.addEventListener('click', initMoney)
  buttonTres.addEventListener('click', () => {
    initTresEnRaya()
  })
  buttonTrivial.addEventListener('click', initTrivial)

  header.appendChild(buttonMoney)
  header.appendChild(buttonTres)
  header.appendChild(buttonTrivial)

  divApp.appendChild(header)
}
