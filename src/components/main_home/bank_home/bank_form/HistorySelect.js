import './HistorySelect.css'

  const HistorySelect = ({onHandleChange, filteredHistory}) => {

  return (
    <div className="header_action">
      <h1>HISTORY</h1>
        <select onChange={(e) => onHandleChange (e.target.value)} value={filteredHistory}>
          <option value="all">All</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="sendMoney">Send Money</option>
          <option value="recievedMoney">Received Money</option>
      </select>
  </div>
  )
}

export default HistorySelect
