import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
      <h1 style={{'color': 'red', 'background':'black'}}>Hello</h1>

      <h5 className='text-info bg-danger fs-6'>Lorem ipsum dolor sit amet consectetur.</h5>

      <Link to={'/first'}>Go to First Component</Link> <br />
      {/* <a href="/first">First Component</a> */}

    </>
  )
}

export default App


// object
// const data = {
//   "key" : "value",
//   "key" : "value",
//   "key" : "value",

// }