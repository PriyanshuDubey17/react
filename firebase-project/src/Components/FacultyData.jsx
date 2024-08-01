import React, { useState } from 'react'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import { app } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const FacultyData = () => {

  const navigate= useNavigate()
 const [formData, setFormData] = useState({
  userRollNo:"",
  userEmail : "",
  userPassword:""
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
 


  // Save data to Realtime Database
 const mainData = await addDoc(collection(db, 'facultyData'), {
    userRollNo: formData.userRollNo,
    UsernameEmail: formData.userEmail,
    UserPassword: formData.userPassword,
    
 });
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
<button type='submit'> Submit </button>

</form>

    </>
  )
}

export default FacultyData