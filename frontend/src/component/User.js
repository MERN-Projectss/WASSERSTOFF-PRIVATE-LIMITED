import "./User.css"

import React, { useState } from 'react'
import axios from 'axios'

export const User = () => {

const [user,setUser] = useState({
    userName : ""
})

const handleChange = (e)=>{
  setUser({...user,[e.target.name]:e.target.value})
}
const handleSubmit =(e)=>{
  e.preventDefault()
  const userName = user

  axios.post('/regUser',e).then(
    (res)=>{
      if(res.status===200){
        alert('user created')

      }else Promise.reject()
    }
  ).catch( (err)=>alert(`${err.message} happened`))
}

  return (
    <div>
        <div>
            <h3>User Name</h3>
        </div>
        <FormData>
            <label className="userName" >User Name</label>
            <input  className="input" onChange={handleChange} type="text" name="userName" value={userName}/>
            <button type="Submit" className="btn" onClick={handleSubmit}>Submit</button>
        </FormData>
    </div>
  )
}
