import { Link } from 'react-router-dom'
import { useLogoutLG } from '../hooks/useLogoutLG'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logoutLG } = useLogoutLG()
  const { userLG } = useAuthContext()


  const handleClick = () => {
    logoutLG()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Chromagen</h1>
        </Link>
        <nav>
          {userLG && (
            <div>
              <span>{userLG.email}</span>
              <span>{userLG.isActive ? 'Inactive' : 'Active'}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!userLG && (
            <div>
              <Link to="/loginLG">Login</Link>
              <Link to="/signupLG">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar