import './Withdrawal.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateNewBalance, saveToHistory } from './../../../../redux-slice/UserSlice'
import { errorMessage, successMessage } from '../../../../utils/message'
import React, { useState } from 'react'
import moment from 'moment'

const Withdrawal = () => {
  const dispatch = useDispatch()
  const {auth ,users}= useSelector((store) => store )
  const userId = auth.authId

  const [amount, setAmount] = useState('')

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (amount === '') {
      return errorMessage('Error!', 'Please input withdrawal number amount!')
    }
    if (amount < 100) {
      return errorMessage(
        'Error!',
        '$100 above minimun withdrawal required',
        'error',
      )
    } 

    const user = users.find((user) => user.id === auth.authId)
    if (amount > user.balance) {
      return errorMessage(
        `Not enough balance in your account`,
        `Your remaining balance is $ ${user.balance}`,
      )
    } else {
      const action = 'withdrawal'
      const all = 'all'
      dispatch(updateNewBalance({
        amount, 
        action,
        userId
      }))
      dispatch(saveToHistory({
        date: moment().format('MMMM Do YYYY h:mm a'),
        amount,
        action,
        userId,
        all
      }))
      setAmount('')
      successMessage(`Well done `, `Successfully withdraw $ ${amount}`)
    }
  }

  return (
    <div className="withdrawal_div">
      <form onSubmit={onHandleSubmit}>
        <h1>WITHDRAWAL</h1>
        <div className="form-action">
          <label>Withdraw Exact Amount</label>
          <input type="number" placeholder="Withdraw Exact Amount" value={amount} onChange={ (event) => setAmount(event.target.value)} />
          <button type="submit">PROCEED</button>
        </div>
      </form>
    </div>
  )
}

export default Withdrawal
