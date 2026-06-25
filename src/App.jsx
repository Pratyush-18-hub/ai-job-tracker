import { useState, useEffect } from 'react'
import axios from 'axios'

function App(){

  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [token, setToken] = useState('')
  const [userName, setUserName] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/jobs')
      .then(response => setJobs(response.data))
  }, [])

  const addJob = () => {
    if(company === '' || role === '') return
    const newJob = { company: company, role: role, status: status }
    axios.post('http://127.0.0.1:8000/jobs', newJob)
      .then(() => {
        setJobs([...jobs, newJob])
        setCompany('')
        setRole('')
        setStatus('Applied')
        setShowForm(false)
      })
  }

  const handleLogin = () => {
    if(loginEmail === '' || loginPassword === '') return
    axios.post('http://127.0.0.1:8000/login', {
      email: loginEmail,
      password: loginPassword
    })
    .then(response => {
      if(response.data.token) {
        setToken(response.data.token)
        setUserName(response.data.name)
        setIsLoggedIn(true)
      } else {
        alert(response.data.error)
      }
    })
  }

  const handleSignup = () => {
    if(signupName === '' || signupEmail === '' || signupPassword === '') return
    axios.post('http://127.0.0.1:8000/signup', {
      name: signupName,
      email: signupEmail,
      password: signupPassword
    })
    .then(response => {
      if(response.data.message) {
        alert('Signup successful! Please login.')
        setShowSignup(false)
      } else {
        alert(response.data.error)
      }
    })
  }

  const getStatusColor = (status) => {
    if (status === 'Applied')   return 'bg-blue-500'
    if (status === 'Interview') return 'bg-purple-500'
    if (status === 'Offer')     return 'bg-green-500'
    if (status === 'Rejected')  return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {!isLoggedIn ? (

        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-center mb-2">🎯 AI Job Tracker</h1>
            <p className="text-gray-400 text-center mb-6">
              {showSignup ? 'Create your account' : 'Welcome back!'}
            </p>

            {showSignup && (
              <input
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-3 outline-none"
              />
            )}

            <input
              value={showSignup ? signupEmail : loginEmail}
              onChange={(e) => {
                if(showSignup) {
                  setSignupEmail(e.target.value)
                } else {
                  setLoginEmail(e.target.value)
                }
              }}
              placeholder="Email address"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-3 outline-none"
            />

            <input
              type="password"
              value={showSignup ? signupPassword : loginPassword}
              onChange={(e) => {
                if(showSignup) {
                  setSignupPassword(e.target.value)
                } else {
                  setLoginPassword(e.target.value)
                }
              }}
              placeholder="Password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
            />

            <button
              onClick={showSignup ? handleSignup : handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-4">
              {showSignup ? 'Create Account' : 'Login'}
            </button>

            <p className="text-center text-gray-400 text-sm">
              {showSignup ? 'Already have an account? ' : "Don't have an account? "}
              <span
                onClick={() => setShowSignup(!showSignup)}
                className="text-blue-400 cursor-pointer hover:underline">
                {showSignup ? 'Login' : 'Sign up'}
              </span>
            </p>

          </div>
        </div>

      ) : (

        <div>
          <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">🎯 AI Job Tracker</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Welcome, {userName}!</span>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                + Add Job
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium">
                Logout
              </button>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto px-6 py-8">

            {showForm && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Add New Job</h3>
                <div className="flex gap-3 flex-wrap">
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1 outline-none"
                  />
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-1 outline-none"
                  />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none">
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={addJob}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium">
                    Add
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-400 text-sm">Total Applied</p>
                <h2 className="text-3xl font-bold mt-1">{jobs.length}</h2>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-400 text-sm">Interviews</p>
                <h2 className="text-3xl font-bold mt-1 text-purple-400">{jobs.filter(job => job.status === 'Interview').length}</h2>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-400 text-sm">Offers</p>
                <h2 className="text-3xl font-bold mt-1 text-green-400">{jobs.filter(job => job.status === 'Offer').length}</h2>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-gray-400 text-sm">Rejected</p>
                <h2 className="text-3xl font-bold mt-1 text-red-400">{jobs.filter(job => job.status === 'Rejected').length}</h2>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-semibold text-lg">My Applications</h3>
              </div>
              {jobs.map((job, index) => (
                <div key={index} className="flex justify-between items-center px-6 py-4 border-b border-gray-800 hover:bg-gray-800 transition">
                  <div>
                    <p className="font-semibold">{job.company}</p>
                    <p className="text-gray-400 text-sm mt-1">{job.role}</p>
                  </div>
                  <span className={`${getStatusColor(job.status)} text-white text-sm px-4 py-1 rounded-full`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default App