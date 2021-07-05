import './Deposit.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateNewBalance, saveToHistory } from './../../../../redux-slice/UserSlice'
import React, { useState } from 'react'
import { errorMessage, successMessage } from '../../../../utils/message'
import moment from 'moment'

const Deposit = () => {
  const dispatch = useDispatch()
  const auth = useSelector(({ auth }) => auth )
  const userId = auth.authId
 
  const [amount, setAmount] = useState('')

  const onHanddleSubmit = (e) => {
    e.preventDefault()
    console.log(amount)
    if (amount === '') {
      errorMessage('Error!', 'Please input deposit number amount!')
    }

    if (amount < 1000) {
      errorMessage('Error!', '$1000 above minimun deposit required')
    } else {
    const action = 'deposit'
    const all = 'all' //// for history purpose to filter all the history
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
      successMessage('Well done', `Successfully deposit $ ${amount}`)
    }

  }

  return (
    <div className="deposit_div">
      <form>
        <h1>DEPOSIT</h1>
        <div className="form-action">
          <label>Deposit Exact Amount</label>
          <input type="number" placeholder="Deposit Exact Amount" value={amount} onChange={ (event) => setAmount(event.target.value)} />
          <button onClick={onHanddleSubmit}>PROCEED</button>
        </div>
      </form>
    </div>
  )
}

export default Deposit
