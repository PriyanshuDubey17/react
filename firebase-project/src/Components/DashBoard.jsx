import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
<>
<div  style={{height:'100vh', display:"flex", justifyContent:"s"}}>
   
    <div style={{backgroundColor:'royalblue', width:'20%'}}> <h1>side nav bar</h1>
    
    <Link to= '/addStudent'  style={{Color:'white', width:'100% ', display:"block", fontSize:'1.5rem'}}>Add Student </Link>
    <Link to='/StudentList' style={{fontSize:'1.5rem',Color:'white', width:'100% ', display:"block"}}>Student List </Link>
    

    </div>
   
    <div style={{fontSize:'1.3rem',backgroundColor:'purple', width:'80%'}}> <h1> Dasboard Menu</h1>
    <Outlet />
    </div>
    

</div>
</>
  )
}

export default DashBoard