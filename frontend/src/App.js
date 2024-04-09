import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import AgentHome from './pages/AgentHome'
import Navbar from './components/Navbar'
import AddForm from './pages/AddForm'
import EditForm from './pages/EditForm'
import AGEditForm from './pages/AGEditForm'
import ReadForm from './pages/ReadForm'
import AGReadForm from './pages/AGReadForm'
import LoginLG from './pages/LoginLG'
import SignupLG from './pages/SignupLG'

function App() {
  const { userLG } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={userLG ? (
                userLG.role === "Lead Generation" ? <Home /> : (
                userLG.role === "Telemarketer" ? <AgentHome /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route path="/add" element={<AddForm />} />
            <Route path="/edit/:id" element={<EditForm />} />
            <Route path="/agentedit/:id" element={<AGEditForm />} />
            <Route path="/view/:id" element={<ReadForm />} />
            <Route path="/agentview/:id" element={<AGReadForm />} />

            {/* Login Route */}
            <Route path="/loginLG" element={!userLG ? <LoginLG /> : <Navigate to="/" />} />

            {/* Signup Route */}
            <Route path="/signupLG" element={!userLG ? <SignupLG /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App