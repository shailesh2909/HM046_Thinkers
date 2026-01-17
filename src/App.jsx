import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import SignInSelect from './components/SignInSelect'
import SignUpSelect from './components/SignUpSelect'
import FreelancerSignUp from './pages/FreelancerSignUp'
import CompanySignUp from './pages/CompanySignUp'
import FreelancerSignIn from './pages/FreelancerSignIn'
import CompanySignIn from './pages/CompanySignIn'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInSelect/>} />
        <Route path="/signup" element={<SignUpSelect />} />
        <Route path="/signup/freelancer" element={<FreelancerSignUp/>} />
        <Route path="/signup/company" element={<CompanySignUp/>} />
        <Route path="/signin/freelancer" element={<FreelancerSignIn />} />
        <Route path="/signin/company" element={<CompanySignIn />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App