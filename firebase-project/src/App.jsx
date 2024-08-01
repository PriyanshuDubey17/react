
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import DashBoard from "./Components/DashBoard";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";
import Update from "./Components/Update";
import FacultyList from "./Components/FacultyList";
import FacultyData from './Components/FacultyData';
import UpdateFaculty from './Components/UpdateFaculty';

function App() {
  
  const myRouter= createBrowserRouter([
      
    { path:'' , Component : DashBoard, children:[

      {path:"/StudentList"  , Component : StudentList },
      
      {path:"/addStudent"  , Component : AddStudent },

      {path:"/update"  , Component : Update },

      {path:"/facultyList"  , Component : FacultyList },

      {path:"/facultyData"  , Component : FacultyData},

      {path:"/updateFaculty"  , Component : UpdateFaculty}
    ]
  
  }
,
{path:'/' , Component : DashBoard }

])
 
  return ( 
    <>
  <RouterProvider  router={myRouter}/>
 
</>
  );
}

export default App;