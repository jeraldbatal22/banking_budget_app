import './ExpenseForm.css'
import {useState} from 'react'
import { errorMessage, successMessage } from '../../../../utils/message'
import { useSelector, useDispatch } from 'react-redux'
import { updateNewBalance, saveToExpenses } from './../../../../redux-slice/UserSlice'
import moment from 'moment'

export const ExpenseForm = ({ cancelFormBtn }) => {
  const dispatch = useDispatch()
  const {auth }= useSelector((store) => store )
  const userId = auth.authId

  const [newExpense, setNewExpense] = useState(
    {
      title:'',
      amount:''
    }
  )
  const onHanddleChange = (e) => {
    const {name, value} = e.target
    newExpense[name] = value
    setNewExpense(newExpense)
  }

  const onHanddleSubmit = (e) => {
    e.preventDefault()

    if (newExpense.title === '') {
      return errorMessage('Error!', 'Please input title')
    }

    if (newExpense.amount === '') {
      return errorMessage('Error!', 'Please input amount')
    }
    
    if (newExpense.amount < 100) {
      return errorMessage('Error!', '$100 above minimun expense required')
    }

    // const user = users.find((user) => user.id === auth.authId)

    // if (newExpense.amount > user.balance) {
    //   return errorMessage(
    //     `Not enough balance in your account`,
    //     `Your remaining balance is $ ${user.balance}`,
    //   )
    // }
    else {
      const action = 'expense'
      dispatch(updateNewBalance({
        amount:newExpense.amount, 
        action,
        userId,
      }))
      dispatch(saveToExpenses({
        action,
        title:newExpense.title,
        amount:newExpense.amount,
        date: moment().format('MMMM Do YYYY h:mm a'),
        id:parseFloat(Date.now().toString()),
        userId
      }))
      cancelFormBtn(true)
      return successMessage(
        'Well done!',
        `Successfully add ${newExpense.title} in the expenses list`,
      )
    }

  }
  return (
    <div className="expense_main">
      <form className="expense_form">
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              autoComplete="off"
              onChange={onHanddleChange}
            />
          </div>

          <div className="new-expense__control">
            <input
              type="number"
              min="0.01"
              step="0.01"
              name="amount"
              autoComplete="off"
              placeholder="Amount"
              onChange={onHanddleChange}
            />
          </div>
        </div>

        <div className="new-expense__actions">
          <button type="button" onClick={cancelFormBtn}>
            Cancel
          </button>
          <button onClick={onHanddleSubmit}>Add Expense</button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm
