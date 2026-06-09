import { useState } from "react"
function App(){
  const[jobs, setjobs] = useState([
    { company: "Amazon", role: "SDE Intern", status: "Applied" },
    { company: "Microsoft", role: "SWE Intern", status: "Interview" },
    { company: "Google", role: "SWE Intern", status: "Rejected" },
    { company: "Meta", role: "SWE Intern", status: "Interview" }
  ])
  const [showForm,setShowForm] = useState(false)
  const [company,setcompany] = useState('')
  const [role,setrole]=useState('')
  const [status,setStatus] = useState('Applied')

  const addjob = ()=>{
    if (company ===''|| role ==='') return
    const newjob = {company : company ,role: role,status : status}
    setjobs([...jobs,newjob])
    setcompany('')
    setrole('')
    setStatus('Applied')
    setShowForm(false)
  }
  const getstatuscolor = (status)=>{
    if (status === 'Applied') return 'blue'
    if (status === 'Interview') return 'purple'
    if (status === 'Rejected') return 'red'
  }
  return (
    <div>
      <nav style={{ display : 'flex',justifyContent: 'space-between',padding: '16px',backgroundColor:'#1a1a2e'}}>
        <h2 style={{color:'white', margin:0}}>AI JOB TRACKER</h2>
        <button onClick={() => setShowForm(true)}style={{padding: "8px 16px",cursor: 'pointer'}}>ADD JOBS</button>
        
      </nav>
      {showForm &&(
          <div style={{ background:'#16213e', padding:'24px', margin:'24px', borderRadius:'8px' }}>
            <h3 style = {{color: 'White',margin: '0 0 16px'}}>Add New Job</h3>

            <input value ={company} onChange={(e) => setcompany(e.target.value)}
            placeholder='Company Name' style={{ padding:"8px",marginRight:'10px',borderRadius:'4px'}}/>
            <input
              value={role}
              onChange={(e) => setrole(e.target.value)}
              placeholder="Role"
              style={{ padding:'8px', marginRight:'10px', borderRadius:'4px' }}
              />
              <select value={status}onChange={(e)=>setStatus(e.target.value)} style={{ padding:'8px', marginRight:'10px', borderRadius:'4px' }}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            <button onClick={addjob} style ={{padding:'8px',cursor: 'pointer'}}>ADD</button>
            <button onClick= {()=> setShowForm(false)}
             style={{padding:'8px 16px', cursor:'pointer', marginLeft:'10px'}}>Cancel</button>
          </div>
        )}
      <div style={{display:'flex',gap:'16px',padding :'24px'}}>
        
        <div style = {{backgroundColor:'#16213e',padding: '20px', borderRadius: '8px',flex:1}}>
          <p style={{ color: 'gray', margin: 0 }}>Total Applied</p>
          <h2 style={{ color: 'white', margin: '8px 0 0' }}>{jobs.length}</h2>
        </div>
        <div style ={{backgroundColor:'#16213e',padding:'20px',borderRadius:'8px',flex: 1 }}>
          <p style={{color:"gray", margin:0}}>Interviews</p>
          <h2 style = {{color: 'white',margin:'8px 0 0'}}>{jobs.filter(job => job.status === 'Interview').length}</h2>
        </div>
        <div style = {{ backgroundColor:'#16213e',padding :'20px',borderRadius:'8px',flex:1}}>
          <p style={{ color:'gray',margin:'0'}}>Offers</p>
          <h2 style={{color:'gray',margin:'8px 0 0'}}>{jobs.filter(job => job.status === "offer").length}</h2>
        </div>
        <div style = {{backgroundColor:'#16213e',padding:"20px",borderRadius:'8px',flex:1}}>
          <p style={{ color:'gray',margin:'0'}}>Rejected</p>
          <h2 style={{color:'gray',margin:'8px 0 0'}}>{jobs.filter(job => job.status === "Rejected").length}</h2>
        </div>
      </div>
      <div style={{ margin:'0 24px'}}>
      <h3 style={{color:'white'}}>My Applications</h3>

      {jobs.map((job, index)=> (
        <div key ={index} style ={{display: 'flex',justifyContent: 'space-between',alignItems:'center',background:'#16213e',padding:'16px', borderRadius:'8px',marginBottom:'10px'}}>
        <div>
          <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>{job.company}</p>
          <p style={{ color: 'gray', margin: '4px 0 0' }}>{job.role}</p>
        </div>
        <span style={{ background: getstatuscolor(job.status), color: 'lightblue', padding: '4px 12px', borderRadius: '20px' }}>{job.status}
        </span>
      </div>))}
      </div>
    </div>
  )
}
export default App