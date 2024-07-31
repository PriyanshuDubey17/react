import { useState } from "react";
import { getDatabase, set, ref as dbRef } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rollNo: "",
    selectFile: null
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const db = getDatabase(app);
      const storage = getStorage(app);

      // Upload file
      const fileRef = storageRef(storage, `images/${formData.rollNo}`);
      await uploadBytes(fileRef, formData.selectFile);

      // Get file URL
      const imageURL = await getDownloadURL(fileRef);

      // Save data to Realtime Database
      await set(dbRef(db, 'student/' + formData.rollNo), {
        rollNo: formData.rollNo,
        username: formData.username,
        password: formData.password,
        imageUrl: imageURL
      });

      navigate("/StudentList");
    } catch (error) {
      console.error("Error adding student: ", error);
    }

    // Reset form data
    setFormData({
      username: "",
      password: "",
      rollNo: "",
      selectFile: null
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
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="rollNo" style={labelStyle}>Roll Number</label>
        <input
          type="text"
          placeholder="Enter your roll number"
          value={formData.rollNo}
          name="rollNo"
          onChange={handleChange}
          id="rollNo"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = ''}
        />

        <label htmlFor="username" style={labelStyle}>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          name="username"
          onChange={handleChange}
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
          onChange={handleChange}
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
          Submit
        </button>
      </form>
    </>
  );
}

export default AddStudent;
