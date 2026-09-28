import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Counter = () => {
    // useState ==> state management
    const [count, setCount] = useState(1)
    // count is a variable that store "0" and 
    // setCount is a function associated with count that updates the value of count

    const [product, setProduct] = useState([])


    axios.get('https://dummyjson.com/products')
    .then((result)=>console.log(result.data.products))
    .catch(console.log('Something Went Wrong in axios.'))


    const decrease=()=>{
        if (count > 1){
            setCount(count-1)
        }
        else{
            // alert("Count Must be at least 1.")
            Swal.fire({
                    title: "Information!",
                    icon: "info",
                    text: "Count Must be at least 1.",
                    draggable: true,
                    timer:3000
                    });
        }
    }

  return (
    <>
    <div className='text-center'>
        <h1 className='text-center'>The initial state is <br /> 
            <span className='display-1'>{count}</span> 
        </h1>
        <button onClick={()=>setCount(count+1)}>Up</button>

        {
            count > 1 && <button onClick={decrease}>Down</button>
        }
        
    </div>

      
    </>
  )
}

export default Counter
