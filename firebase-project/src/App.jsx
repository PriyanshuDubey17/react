import AddData from "./Components/AddData";
import {Route, RouterProvider, createBrowserRouter} from 'react-router-dom'
import DashBoard from "./Components/DashBoard";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";
import Update from "./Components/Update";

function App() {
  
  const myRouter= createBrowserRouter([
      
    { path:'' , Component : DashBoard, children:[

      {path:"/StudentList"  , Component : StudentList },
      
      {path:"/addStudent"  , Component : AddStudent },

      {path:"/update"  , Component : Update }
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