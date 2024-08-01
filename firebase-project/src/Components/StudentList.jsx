import React from "react";
import { ref, onValue, getDatabase, remove } from "firebase/database";
import { app } from "../Firebase/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';

const StudentList = () => {
  const [studentData, setStudentData] = useState(null);
   const navigate= useNavigate();
  useEffect(() => {
    const db = getDatabase(app);
    const refStudent = ref(db, "student");
    onValue(refStudent, (snapshot) => {
      const data = snapshot.val();
    //   console.log(data);
      setStudentData(data);
    });
  }, []);

  const deleteData = (key) => {
    const db = getDatabase(app);
    const storage= getStorage(app)
    
    const refStudent = ref(db, "student/" + key);
    const myRef = storageRef(storage, `images/${key}`);

    deleteObject(myRef)
    .then (res=>{
        remove(refStudent);
    })
    .catch(err=>{
        console.log(err)
    })
  };

  const redirect = (key, value) => {
    navigate('/update', { state: [ key, value ] });
  };
  


  return (
    <>
      <h1 style={{ textAlign: "center" }}> Student List </h1>
      <div>
       
        {studentData && (
          <div>
            {" "}
            {Object.entries(studentData).map(([key, value]) => {
              return (
                <div key={key}>
                 <img src={value.imageUrl} alt="image" style={{height:"7rem", width:"13rem"}}/> 
                  <h1>
                    {" "}
                     
                    {value.rollNo} = <span>{value.username}</span>
                  </h1>
                  <button
                    onClick={() => {
                      deleteData(key);
                    }}
                  >
                    Delete
                  </button>
                 
                  <button
                  style={{ marginLeft: "6px" }}
                  onClick={() => redirect(key, value)}
                >
                  Update
                </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
