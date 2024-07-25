import "./Product.css"

function print(){
    console.log ("button was click");
}
function Product({title,price ,features}){
// const list=features.map((feature)=><li>{feature}</li>);
let color = { backgroundColor : price > 30000 ? "yellow" : null};
return (
<div className="Product" style={color}>
<h3>{title}</h3>
<p>Price :{price}</p>
<p>{features}</p>
{/* <h3>{features.map((feature)=><li>{feature}</li>)}</h3> */}
<p onClick={print}>click me</p>
</div>
)
}
export default Product;