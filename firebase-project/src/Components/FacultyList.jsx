import React, { useEffect, useState } from 'react';
import { app } from '../Firebase/Firebase';
import { getDocs, getFirestore, collection, deleteDoc, doc } from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';

const FacultyList = () => {
  const [facultyData, setFacultyData] = useState([]); // Initialize as an empty array 
  const navigate= useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const db = getFirestore(app);
      const dbRef = collection(db, 'facultyData');
      const docRef = await getDocs(dbRef);
      const realData = docRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFacultyData(realData);
    } catch (err) {
      setError('Failed to fetch faculty data');
      console.error('Error fetching data: ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const db = getFirestore(app);
    const deleteRef = doc(db, 'facultyData', id);

    try {
      await deleteDoc(deleteRef);
      // Refresh the data after deletion
      await getData(); // Note: make sure getData is in scope or handled properly
    } catch (error) {
      setError('Failed to delete faculty data');
      console.log('Error deleting data: ', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }



  const redirect = (facultyListData) => {
    navigate('/updateFaculty', { state:  facultyListData });
  };
  return (
    <>
      <h1>Faculty List</h1>
      <div>
        {facultyData.length === 0 ? (
          <p>No faculty data available.</p>
        ) : (
          facultyData.map(facultyListData => (
            <div key={facultyListData.id}>
              <p>{facultyListData.userRollNo}</p>
              <p>{facultyListData.UsernameEmail}</p> {/* Ensure this matches your Firestore field */}
              <button onClick={() => handleDelete(facultyListData.id)}>Delete</button>
              <button style={{ marginLeft: "6px" }}onClick={() => redirect(facultyListData)} >   Update </button>
                  
                  
               
               
               
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FacultyList;
