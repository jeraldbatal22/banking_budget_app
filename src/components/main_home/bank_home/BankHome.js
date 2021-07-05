import './BankHome.css'
import BankButton from './bank_button/BankButton'
import BankInfo from './bank_info/BankInfo'
import Deposit from './bank_form/Deposit'
import Expense from './bank_expense/Expense'
import History from './bank_form/History'
import Withdrawal from './bank_form/Withdrawal'
import SendMoney from './bank_form/SendMoney'

import { useState } from 'react'

const BankHome = () => {

  const [switchRoute, setSwitchRoute] = useState('deposit')
  const getRoute = (changeForm) => {
    setSwitchRoute(changeForm)
  }

  return (
    <>
      <div className="main_bank">
        <BankInfo />
        <BankButton getRoute={getRoute} />
      </div>

      <div className="bank_form">
        <Expense />
        {switchRoute === 'deposit' ? <Deposit /> : ''}
        {switchRoute === 'withdrawal' ? <Withdrawal /> : ''}
        {switchRoute === 'send-money' ? <SendMoney /> : ''}
        {switchRoute === 'history' ? <History /> : ''}
      </div>
    </>
  )
}

export default BankHome
