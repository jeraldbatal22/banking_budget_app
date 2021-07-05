import './SendMoney.css'
import { useState } from 'react'
import { errorMessage, successMessage } from '../../../../utils/message'
import { useSelector, useDispatch } from 'react-redux'
import { updateNewBalance, saveToHistory } from './../../../../redux-slice/UserSlice'
import moment from 'moment'

const SendMoney = () => {

  const dispatch = useDispatch()

  const {auth ,users}= useSelector((store) => store )
  const userId = auth.authId
  const [sendMoney, setSendMoney] = useState({
    accountNumber: '4892357189263',
    amount: '',
  })

  const onHanddleChange = (e) => {
    const { value, name } = e.target
    setSendMoney({ ...sendMoney, [name]: value })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (sendMoney.accountNumber === '') {
      return errorMessage('Error!', 'Please input Account Number', 'error')
    }

    if (sendMoney.accountNumber.length < 10) {
      return errorMessage(
        'Error!',
        'Account Number must be 13 digits!',
        'error',
      )
    }

    const sendAmount = users.find((user) => user.id === parseFloat(sendMoney.accountNumber))

    if (!sendAmount) {
      return errorMessage(
        'Error!',
        `${sendMoney.accountNumber} is not registered as a account number!`,
      )
    }

    if (userId === parseFloat(sendMoney.accountNumber)) {
      return errorMessage('Error!', `You can't send money to yourself`)
    }

    if (sendMoney.amount === '') {
      return errorMessage('Error!', 'Please input send money amount!')
    }

    if (sendMoney.amount < 100) {
      return errorMessage('Error!', '$100 above minimun required')
    }

    const user = users.find((user) => user.id === auth.authId)

    if (sendMoney.amount > user.balance) {
      return errorMessage(
        `Not enough balance in your account`,
        `Your remaining balance is $ ${sendAmount.balance}`,
      )
    } else {
      const all = 'all'
      dispatch(updateNewBalance({
        amount: parseFloat(sendMoney.amount), 
        action:'sendMoney',
        userId,
        sendAmount: sendAmount
      }))
      dispatch(saveToHistory({
        action:'sendMoney',
        date: moment().format('MMMM Do YYYY h:mm a'),
        amount:sendMoney.amount,
        receiver:sendAmount,
        sender:user,
        userId,
        all
      }))
      dispatch(saveToHistory({
        action:'recievedMoney',
        date: moment().format('MMMM Do YYYY h:mm a'),
        amount:sendMoney.amount,
        receiver:sendAmount,
        sender:user,
        userId,
        all
      }))
      successMessage(
        'Successfully Send Money',
        `You send $${
          sendMoney.amount
        } to your friend ${sendAmount.firstname.toUpperCase()} ${sendAmount.lastname.toUpperCase()}`,
      )
    }
  }

  return (
    <>
      <div className="send_money_div">
        <form>
          <h1>SEND MONEY</h1>
          <div className="form-action">
            <input
              type="number"
              name="accountNumber"
              placeholder="Account Number (13 digit)"
              onChange={onHanddleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Exact Amount you want send"
              onChange={onHanddleChange}
            />
            <button onClick={onHandleSubmit}> PROCEED</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SendMoney
