import { useState } from "react";
import {getDatabase, set, ref, get} from 'firebase/database'
import { app } from "../Firebase/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// ka data
function Update () {

    const Navigate = useNavigate();
    const location= useLocation();
    console.log(location);

  const [formData, setFormData] = useState({
    username: location.state[1].username,
    password: location.state[1].password,
    rollNo : location.state[0],
    selectFile: location.state[0]
  });
 console.log(location);

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    // Check if files are present and handle the file
    if (files.length > 0) {
      setFormData((currentData) => ({
        ...currentData,
        [name]: files[0] // Only take the first file selected
      }));
    }
  };

  const handleClick = (event) => {
    setFormData((currentData) => {
      console.log(event.target.name);
      return { ...currentData, [event.target.name]: event.target.value };
    });
  };

  const stopDefault = async (event) => {
    event.preventDefault();
    const db= getDatabase(app)
    const storage = getStorage(app);
    const fileRef = storageRef(storage, `images/${formData.rollNo}`);
    await uploadBytes(fileRef, formData.selectFile);

    const imageURL = await getDownloadURL(fileRef);
    set(ref(db,'student/' +formData.rollNo),{
        rollNo: formData.rollNo,
        username: formData.username,
        password: formData.password,
        imageUrl: imageURL
    }).then (res=>{
       Navigate("/StudentList")
    }).catch(error=>{
        console.log(error)
    })
   
   
    setFormData({
      username: "",
      password: "",
      rollNo: ""
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const inputFocusStyle = {
    borderColor: '#007bff'
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };

  return (
    <>
      <form onSubmit={stopDefault} style={formStyle}>

      <label htmlFor="roll" style={labelStyle}>User Name</label>
        <input
          type="Number"
          disabled
          placeholder="Enter your rollNo"
          value={formData.rollNo}
          name="rollNo"
          onChange={handleClick}
          id="roll"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = ''}
        />


        <label htmlFor="username" style={labelStyle}>User Name</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          name="username"
          onChange={handleClick}
          id="username"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = ''}
        />

        <label htmlFor="password" style={labelStyle}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          name="password"
          onChange={handleClick}
          id="password"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = ''}
        />
        
        <label htmlFor="selectFile" style={labelStyle}>Choose File</label>
        <input
          type="file"
          name="selectFile"
          onChange={handleFileChange}
          id="selectFile"
          style={inputStyle}
        />
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default Update;

