import './Expense.css'
import NewExpense from './NewExpense'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import EditExpenseForm from './EditExpenseForm'
import { useSelector, useDispatch } from 'react-redux'
import { saveToExpenses } from './../../../../redux-slice/UserSlice'
import { successMessage } from '../../../../utils/message'
import { useState } from 'react'

const Expense = () => {
  const { auth, users } = useSelector((store) => store)
  const user = users.find((user) => user.id === auth.authId)
  const dispatch = useDispatch()

  const deleteExpense = (expense, index) => {

    dispatch(saveToExpenses({
      action: 'deleteExpense',
      userId: auth.authId,
      index,
    }))
    return successMessage(
      'Well done!',
      `Successfully Deleted ${expense.title} exepenses`,
    )
  }

  const [showEditForm, setShowEditForm] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const showFormBtn = (item) => {
    setShowEditForm(true)
    setEditExpense({ ...item })
  }

  const hideFormBtn = () => {
    setShowEditForm(false)
  }

  // Pagination 

  const [currenPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const indexOflastPost = currenPage * postsPerPage;
  const indexOfFirstPost = indexOflastPost - postsPerPage
  const currentPosts = user.expenses.slice(indexOfFirstPost, indexOflastPost)

  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber)
  }

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(user.expenses.length / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="expense">
      <div className="expense-table">
        <h1>EXPENSES</h1>

        <NewExpense />

        <table className="expense-action">
          <thead>
            <tr>
              <th>Expense Title</th>
              <th>Expense Cost</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>₱ {expense.amount}</td>
                <td>{expense.date}</td>
                <td>
                  <EditIcon className="editBtn" onClick={() => showFormBtn(expense)} />
                  <DeleteIcon className="deleteBtn" onClick={() => deleteExpense(expense, index)} />
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <div className="pagination">
          {
            pageNumbers.map(number => (
              <button key={number} onClick={() => paginate(number)}>{number}</button>
            ))
          }
        </div>

        {showEditForm ? <EditExpenseForm hideFormBtn={hideFormBtn} editExpense={editExpense} setEditExpense={setEditExpense} /> : ''}
      </div>
    </div>
  )
}

export default Expense
