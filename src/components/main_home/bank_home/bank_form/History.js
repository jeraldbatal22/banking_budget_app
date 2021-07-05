import './History.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import HistoryPagination from './HistoryPagination'
import HistorySelect from './HistorySelect'

const History = () => {
  const { auth, users } = useSelector((store) => store)
  const user = users.find((user) => user.id === auth.authId)

  const [currenPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const indexOflastPost = currenPage * postsPerPage;
  const indexOfFirstPost = indexOflastPost - postsPerPage
  const currentPosts = user.history.slice(indexOfFirstPost, indexOflastPost)

  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber)
  }

  const [filteredHistory, setFilteredHistory] = useState('all')

  const filteredExpenses = currentPosts.filter((item) => item.action === filteredHistory || item.all === filteredHistory)
  const onHandleChange = (selectValue) => {
    setFilteredHistory(selectValue)
  }

  return (
    <>
      <div className="history_div">
        {user.history.length ? (
          <>
            <HistorySelect onHandleChange={onHandleChange} filteredHistory={filteredHistory} />
            <table className="deposit-histoy">
              <thead>
                <tr>
                  <th>Type of transaction</th>
                  <th>Date and Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredExpenses.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {
                          (item.action === 'sendMoney') ?
                            `Send Money to ${item.receiver.firstname} ${item.receiver.lastname} # ${item.receiver.id}` :
                            (item.action === 'recievedMoney') ? `Recieved Money from ${item.sender.firstname} ${item.sender.lastname} # ${item.sender.id}` : item.action
                        }
                      </td>
                      <td>{item.date}</td>
                      <td>₱ {item.amount}</td>
                    </tr>
                  ))
                }

              </tbody>

            </table>

            <HistoryPagination postsPerPage={postsPerPage} totalPosts={user.history.length} paginate={paginate} />

          </>
        ) : <h1>NO HISTORY FOUND</h1>}

      </div>
    </>
  )
}

export default History


