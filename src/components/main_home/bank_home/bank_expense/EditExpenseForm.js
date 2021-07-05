import './EditExpenseForm.css'
// import { useState } from 'react'
import { successMessage, errorMessage } from '../../../../utils/message'
import { useSelector, useDispatch } from 'react-redux'
import { updateNewBalance, saveToExpenses } from './../../../../redux-slice/UserSlice'
const EditExpenseForm = ({hideFormBtn, editExpense, setEditExpense}) => {
  const dispatch = useDispatch()

  const {auth ,users}= useSelector((store) => store )
  const userId = auth.authId
  const user = users.find((user) => user.id === auth.authId)

  const currentAmount = parseFloat(editExpense.amount)
  
  const onHanddleChange = (e) => {
    const { name, value } = e.target
    if (editExpense.hasOwnProperty(name)) {
      editExpense[name] = value
    }
  }

  const onHanddleSubmit = (e) => {
    e.preventDefault()

    if (editExpense.amount > user.balance) {
      return errorMessage(
        `Not enough balance in your account`,
        `Your remaining balance is $ ${user.balance}`,
      )
    }

    const action = 'updateExpense'
    dispatch(saveToExpenses({
      action,
      userId,
      editExpense,
    }))
    dispatch(updateNewBalance({
      action:'updateExpenseBalance',
      editExpense,
      userId,
      currentAmount
    }))
    successMessage('Well done!', `Successfully updated exepenses`)

    hideFormBtn(true)
  }

  return (
    <div className="edit_expense_main">
      <form className="edit_expense_form">
        <div className="edit_new-expense__controls">
          <div className="edit_new-expense__control">
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              autoComplete="off"
              // value={editExpense.title}
              // onChange={(e) => {setEditExpense({title: e.target.value})}}
              defaultValue={editExpense.title}
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
              defaultValue={editExpense.amount}
              onChange={onHanddleChange}
            />
          </div>
        </div>

        <div className="edit_new-expense__actions">
          <button type="button" onClick={hideFormBtn}>
            Cancel
          </button>
          <button onClick={onHanddleSubmit} >Save Edit</button>
        </div>
      </form>
    </div>
  )
}

export default EditExpenseForm
