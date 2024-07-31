import React from 'react';
import {getDatabase, set, ref} from  "firebase/database"
import { app } from '../Firebase/Firebase';

// ye sab code hme likha hai yeh check krne ke liye database hmrae react se connect hua hai ki nhi .



function AddData () {
const demoData =(userId, name , phone )=>{
    const db = getDatabase(app)
    set(ref(db,'student/'+userId),{
        studentName: name,
        phone :phone
    })
    

}



    return ( 
        <>
        <h1>Add Data</h1>
        <button onClick={()=>{demoData(105 ,"Ramjiguru",1111112)}}>Add Data</button>
        </>
     );
}

export default AddData;