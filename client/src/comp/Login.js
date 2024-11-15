import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from "./Ct"
import logo from './lg-logo.png'

const Login = () => {
  let [data,setData] = useState({"_id":"","pwd":""})
  let [msg,setMsg] = useState("")
  let navigate = useNavigate()
  let obj = useContext(Ct)

  let fun = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let login = ()=>{
    axios.post("http://localhost:5000/login",data).then((res)=>{
      if(res.data.token == undefined)
      {
        setMsg(res.data.msg)
      }
      else{
        obj.storeUpd(res.data)
        navigate("/")
      }
    })
  }

  return (
    <div className='formcon'>
      <div className='lg-logo'>
        <img src={logo} />
      </div>
      <div className='form'>
        <div className='lg-head'>
          <h2>Welcome Back. Please Log In</h2>
          <h2>To Your Account.</h2>
        </div>
        <div className='lg-msg'>{msg}</div>
        <div className='lg-frm'>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Username or E-mail</label>
            <input type="text" class="form-control" name='_id' value={data._id} onChange={fun}  />
        </div>
        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Password</label>
            <input class="form-control" type='password' name='pwd' value={data.pwd} onChange={fun} />
        </div>
        <div className='forgot'>Forgot Password ?</div>
        <div class="col-12">
            <button class="btn btn-primary" onClick={login}>Login</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login