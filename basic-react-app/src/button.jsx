

 function button (){
    return (
        <p onClick={print}>click me</p>
    )
}
function print(){
    console.log ("button was click");
}
export default button;