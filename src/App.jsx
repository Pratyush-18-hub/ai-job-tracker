import { useState,useEffect } from 'react'
import axios from 'axios'

function App(){

 const [jobs, setJobs] = useState([])

  const [showForm, setShowForm] = useState(false)
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')

  useEffect(() =>{
    axios.get('http://127.0.0.1:8000/jobs')
     .then(response => setJobs(response.data))
  },[])

  const addJob = () => {
    if(company === '' || role === '') return
    const newJob = { company: company, role: role, status: status }
    axios.post('http://127.0.0.1:8000/jobs',newJob)
       .then(() => {
    setJobs([...jobs, newJob])
    setCompany('')
    setRole('')
    setStatus('Applied')
    setShowForm(false)
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

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">🎯 AI Job Tracker</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          + Add Job
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ADD JOB FORM */}
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

        {/* STAT CARDS */}
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

        {/* JOB LIST */}
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
  )
}

export default App