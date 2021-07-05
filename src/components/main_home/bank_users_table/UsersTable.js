import './UsersTable.css'
import { useSelector } from 'react-redux'

const UsersTable = () => {
  const { users } = useSelector((store) => store )
  return (
    <>
      <div className="users-table">
        <h1>ACCOUNT USERS</h1>
        <table className="table-users">
          <thead>
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Username</th>
              <th>Balance</th>
              <th>Member Since</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={index}>
                  <td>#{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>${user.balance}</td>
                  <td>{user.date}</td>
                  <td style={{color:'green'}}>Active</td>
                  <th>{user.role === 1 ? <span>Admin</span> : <span>Users</span>}</th>
                </tr>
              ))
            }
         
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UsersTable
