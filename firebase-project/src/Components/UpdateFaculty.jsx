import React, { useState } from 'react'
import {getFirestore, collection, addDoc, doc, updateDoc} from 'firebase/firestore'
import { app } from '../Firebase/Firebase'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateFaculty = () => {
    const location =useLocation();
    console.log(location)
  const navigate= useNavigate()
 const [formData, setFormData] = useState({
  userRollNo: location.state.userRollNo,
  userEmail : location.state.UsernameEmail,
  userPassword: location.state.UserPassword
 })
 
const handleInput=(event) => {
  console.log(event.target.value)
  console.log(event.target.name)
  const { name, value } = event.target;
  setFormData((currentData) => ({
    ...currentData,
    [name]: value
  }));
};



const handleSubmit= async (event)=>{
  event.preventDefault();
 
  const db = getFirestore(app);
 


  // update code method 
 
  const mainData =  doc(db, 'facultyData', location.state.id) 
   try {
    await updateDoc(mainData,{userRollNo: formData.userRollNo,
        UsernameEmail: formData.userEmail,
        UserPassword: formData.userPassword,})
   } catch (error) {
    console.log(error)
   }
  
  
    
 
 console.log(mainData);
  setFormData({
    userRollNo:"",
  userEmail : "",
  userPassword:""
  });
  navigate("/facultyList")
}

  return (
    <>
    <h1>FacultyData</h1>
<form onSubmit={handleSubmit}>
<input type="number"  placeholder='enter roll no' value={formData.userRollNo} name='userRollNo' onChange={handleInput}/><br /> <br />
<input type="email" placeholder='enter email' value={formData.userEmail} name='userEmail' onChange={handleInput}/ ><br /> <br />
<input type="password"  placeholder='enter password' value={formData.userPassword} name='userPassword' onChange={handleInput}/><br /> <br />
<button type='submit'> Update </button>

</form>

    </>
  )
}

export default UpdateFaculty