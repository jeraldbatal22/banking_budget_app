import './BankInfo.css'
// import image from '../../../../images/myimg.png'
import { useSelector } from 'react-redux'
import fileDownload from 'js-file-download'
import AttachmentIcon from '@material-ui/icons/Attachment';

const BankInfo = () => {
  const { auth, users } = useSelector((store) => store)
  const user = users.find((user) => user.id === auth.authId)
  const userStatement = {
    accountNumber: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    password: Date.now() + user.password + Date.now() * 4,
    balance: '$' + user.balance,
    dateOfCreate: user.date,
    role: 'users'
  }

  const handdleDownload = () => {
    fileDownload(JSON.stringify(userStatement), 'bank-statement.json')
  }

  return (
    <div className="bank_info">
      <div className="account-balance">
        <div className="account-info">
          <h2>Account Name </h2>
          <h2>Account Number</h2>
          <h2>Member Since </h2>
        </div>
        <div className="account-info">
          <h3>{user.firstname} {user.lastname}</h3>
          <h3>#{user.id}</h3>
          <h3>
            {user.date}
          </h3>
        </div>
        <div className="your-balance">
          <div>
            <img
              src={user.profileImage}
              alt="jerald"
              style={{ width: '200px', borderRadius: '100%' }}
            />
          </div>
          <div>
            <button type="button" onClick={handdleDownload} className="bank_statement_btn"><AttachmentIcon />Bank Statement</button>
            <h1>Balance </h1>
            <span>₱ {user.balance}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankInfo
