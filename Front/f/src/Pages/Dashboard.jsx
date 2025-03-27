import React from 'react'
import Sidebar from '../Components/Sidebar';



function Dashboard() {
  return (
    <>
      <div className="dashboard">
        
        <div className="dheader" style={{padding:'20px'}}>
          <Sidebar />
          <div className='d-flex flex-column align-item-center'>
          <h1 className='text-center'>Dashboard</h1>
          

        </div>
        </div>

      </div>
    </>
  )
}
export default Dashboard;