import './BankButton.css'
import GetAppIcon from '@material-ui/icons/GetApp'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import SendIcon from '@material-ui/icons/Send'
import HistoryIcon from '@material-ui/icons/History'

const BankButton = ({ getRoute }) => {
  // const cards = ['deposit', 'withdrawal', 'send-money', 'history']

  return (
    <div className="bank_button">
      <div className="card_top">
        <div>
          <h3>DEPOSIT</h3>
          <GetAppIcon
            className="deposit-icon"
            onClick={() => getRoute('deposit')}
          />
        </div>
        <div>
          <h3>WITHDRAWAL</h3>
          <MonetizationOnIcon
            className="withdrawal-icon"
            onClick={() => getRoute('withdrawal')}
          />
        </div>
        <div>
          <h3>SEND MONEY</h3>
          <SendIcon
            className="sendmoney-icon"
            onClick={() => getRoute('send-money')}
          />
        </div>
        <div>
          <h3>HISTORY</h3>
          <HistoryIcon
            className="history-icon"
            onClick={() => getRoute('history')}
          />
        </div>
      </div>
    </div>
  )
}

export default BankButton
