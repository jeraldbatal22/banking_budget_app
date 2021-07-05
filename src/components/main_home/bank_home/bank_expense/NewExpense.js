import './NewExpense.css'
import ExpenseForm from './ExpenseForm'
import { useState } from 'react'

export const NewExpense = () => {
  const [showForm, setShowForm] = useState()
  const showFormBtn = () => {
    setShowForm(true)
  }

  const cancelFormBtn = () => {
    setShowForm(false)
  }
  return (
    <>
      {showForm ? (
        <ExpenseForm cancelFormBtn={cancelFormBtn} />
      ) : (
        <div className="new-expense">
          <button onClick={showFormBtn}>Add New Expense</button>
        </div>
      )}
    </>
  )
}

export default NewExpense
