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

  const[resumeFile,setResumeFile] = useState(null)
  const[jobDesc,setJobDesc] = useState('')
  const[analysis,setAnalysis] = useState(null)
  const[analyzing,setAnalyzing] = useState(false)
  const[showAnalyzer,setShowAnalyzer] = useState(false)

  const[downloading,setDownloading] = useState(false)

  useEffect(() => {
    axios.get('https://ai-job-tracker-backend-production-ab23.up.railway.app/jobs')
      .then(response => setJobs(response.data))
  }, [])

  const addJob = () => {
    if(company === '' || role === '') return
    const newJob = { company: company, role: role, status: status }
    axios.post('https://ai-job-tracker-backend-production-ab23.up.railway.app/jobs', newJob)
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
    axios.post('https://ai-job-tracker-backend-production-ab23.up.railway.app/login', {
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
    axios.post('https://ai-job-tracker-backend-production-ab23.up.railway.app/signup', {
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
   const handleAnalyze = async () => {
      if(!resumeFile || jobDesc === '')return
      setAnalyzing(true)

      const formData = new FormData()
      formData.append('resume' ,resumeFile)
      formData.append('job_description',jobDesc)

      try{
        const response = await axios.post('https://ai-job-tracker-backend-production-ab23.up.railway.app/analyze',formData)
        setAnalysis(response.data)
      }
      catch(error){
        alert('Analysis faild! Try again')
      }
      finally{
        setAnalyzing(false)
      }
    }
   const handleDownload = async () =>{
    if(!resumeFile || jobDesc === '')return

    setDownloading(true)

    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description',jobDesc)
    formData.append('candidate_name',userName)

    try{
      const response =  await axios.post('https://ai-job-tracker-backend-production-ab23.up.railway.app/improve-resume',formData,{responseType:'blob'})
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'improved_resume.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
    catch(error){
      alert("Download fail! Try Again.")
    }
    finally{
      setDownloading(false)
    }
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
            <h1 className="text-xl font-bold text-white"> AI Job Tracker</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Welcome, {userName}!</span>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                + Add Job
              </button>
              <button onClick={() => setShowAnalyzer(!showAnalyzer)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                 AI Analyze
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

            {/* AI ANALYZER SECTION */}
{showAnalyzer && (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
    <h3 className="text-lg font-semibold mb-4">🤖 AI Resume Analyzer</h3>

    <div className="mb-4">
      <label className="text-gray-400 text-sm mb-2 block">Upload Resume PDF</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
      />
    </div>

    <div className="mb-4">
      <label className="text-gray-400 text-sm mb-2 block">Paste Job Description</label>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none resize-none"
      />
    </div>

    <div className="flex gap-3">
      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-medium">
        {analyzing ? 'Analyzing...' : '🔍 Analyze Resume'}
      </button>
      <button
        onClick={handleDownload}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium">
        {downloading? 'Downloading...': '📄 Download Improved Resume'}
      </button>
    </div>

    {analysis && (
      <div className="mt-6 space-y-4">

        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">ATS Score</p>
          <div className="flex items-center gap-4">
            <h2 className={`text-4xl font-bold ${
              analysis.ats_score >= 70 ? 'text-green-400' :
              analysis.ats_score >= 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {analysis.ats_score}/100
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              analysis.ats_score >= 70 ? 'bg-green-900 text-green-300' :
              analysis.ats_score >= 50 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
            }`}>
              {analysis.ats_score >= 70 ? 'Good Match' :
               analysis.ats_score >= 50 ? 'Moderate Match' : 'Low Match'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Keyword Match</p>
            <h3 className="text-2xl font-bold text-blue-400">{analysis.keyword_match}%</h3>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Skills Match</p>
            <h3 className="text-2xl font-bold text-purple-400">{analysis.skills_match}%</h3>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Experience Match</p>
            <h3 className="text-2xl font-bold text-green-400">{analysis.experience_match}%</h3>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-3">Missing Skills</p>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_skills.map((skill, index) => (
              <span key={index} className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-3">Suggestions</p>
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <span className="text-yellow-400">→</span>
              <p className="text-gray-300 text-sm">{suggestion}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-2">Overall Summary</p>
          <p className="text-gray-300 text-sm leading-relaxed">{analysis.summary}</p>
        </div>

      </div>
    )}
  </div>
)}

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