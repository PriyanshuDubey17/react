


import { useState } from 'react'
import './index.css'
function App() {
  const [color, setColor]= useState("olive");


  return (
    <>
 
 <div className='w-full h-screen' style={{backgroundColor: color}}> 
<div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0  px-2 "> 
<div className=' flex flex-wrap justify-center gap-5 shadow-lg bg-white p-4 rounded-md w-full'>
<button className='outline-none p-4 mr-3' style={{backgroundColor:"red"}} onClick={()=> setColor("red")}>Red </button>
<button className='outline-none p-4 mr-3' style={{backgroundColor:"yellow"}}  onClick={()=> setColor("yellow")}>yellow </button>
<button className='outline-none p-4 mr-3' style={{backgroundColor:"blue"}}  onClick={()=> setColor("blue")}>blue </button>
<button className='outline-none p-4 mr-3' style={{backgroundColor:"pink"}}  onClick={()=> setColor("pink")}>pink </button>
<button className='outline-none p-4 mr-3' style={{backgroundColor:"green"}}  onClick={()=> setColor("green")}>green </button>

</div>

</div>


 </div>
 
 
 
 

    
    </>
  )
}

export default App
