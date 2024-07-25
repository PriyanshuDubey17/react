import './App.css'
import Title from './Title.jsx'
import Product from './Product.jsx'
import button from './button.jsx';

function App() {
  let options=["priya","riya", "aliya"];
  // let options=[<li>priya</li>,<li>riya</li>, <li>riya</li>,<li>riya</li>];

  return (
  // <Title></Title>
  <>
    <Product title="phone" price={10000} features={options} ></Product>
    <Product title="laptop" price={40000}></Product>
    
    <p></p>
    
   
     </> 
    
  )
}

export default App;
