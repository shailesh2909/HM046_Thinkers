import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import FindProjects from './pages/FindProjects/FindProjects'
import Applications from './pages/Applications/Applications'
import Messages from './pages/Messages/Messages'
import Notifications from './pages/Notifications/Notifications'
import MyProjects from './pages/MyProjects/MyProjects'
import Candidates from './pages/Candidates/Candidates'
import ViewProfile from './pages/ViewProfile/ViewProfile'
import CreateProject from './pages/CreateProject/CreateProject'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import Navbar from './components/Navbar'
import DashboardNavbar from './components/DashboardNavbar'

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }
  return children
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [userType, setUserType] = useState(null)
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUserType = localStorage.getItem('userType')
    const storedUserName = localStorage.getItem('userName')
    
    if (token && storedUserType) {
      setIsAuthenticated(true)
      setUserType(storedUserType)
      setUserName(storedUserName || '')
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
    setUserType(null)
    setUserName('')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <BrowserRouter>
      {!isAuthenticated && <Navbar />}
      {isAuthenticated && <DashboardNavbar userType={userType} userName={userName} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard userType={userType} userName={userName} />
            </ProtectedRoute>
          } 
        />
        <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/find-work" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/find-projects" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FindProjects userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Applications userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Messages userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Notifications userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/my-projects" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MyProjects userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/candidates" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Candidates userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/view-profile/:id/:type" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ViewProfile userType={userType} /></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CreateProject userType={userType} userName={userName} /></ProtectedRoute>} />
        <Route path="/project-details/:projectId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ProjectDetails userType={userType} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App