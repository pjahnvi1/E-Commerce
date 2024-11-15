import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import logo from './lg-logo.png'

const Reg = () => {
  let [data,setData] = useState({"_id":"","name":"","phno":"","pwd":"","add":"","city":"","zip":"","state":""})
  let [msg,setMsg] = useState("")
  let navigate = useNavigate()

  let fun = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let reg = ()=>{
    axios.post("http://localhost:5000/reg",data).then((res)=>{
      if(res.data.msg == "Account Created")
      {
        setMsg("Registration done")
        setData({"_id":"","name":"","phno":"","pwd":"","add":"","city":"","zip":"","state":""})
        navigate("/login")
      }
      else{
        setMsg(res.data.msg)
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
        <h2>Welcome. Please Register</h2>
        <h2>Your Account</h2>
      </div>
      <div className='lg-msg'>{msg}</div>
      <div className='reg-frm'>
      <form class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" name='name' value={data.name} onChange={fun}/>
          </div>
          <div class="col-md-6">
            <label  class="form-label">Mobile Number</label>
            <input type="text" class="form-control"  name='phno' value={data.phno} onChange={fun}/>
          </div>
          <div class="col-md-6">
            <label  class="form-label">Email</label>
            <input type="email" class="form-control"  name='_id' value={data._id} onChange={fun}/>
          </div>
          <div class="col-md-6">
            <label  class="form-label">Password</label>
            <input type="password" class="form-control"  name='pwd' value={data.pwd} onChange={fun}/>
          </div>
          <div class="col-12">
            <label  class="form-label">Address</label>
            <input type="text" class="form-control"  placeholder="1234 Main St" name='add' value={data.add} onChange={fun}/>
          </div>
          <div class="col-md-6">
            <label  class="form-label">City</label>
            <input type="text" class="form-control" name='city' value={data.city} onChange={fun}/>
          </div>
          <div class="col-md-4">
            <label class="form-label">State</label>
            <select  class="form-select" name='state' value={data.state} onChange={fun}>
                <option value="" selected disabled>select State</option>
                <option value="MH">Maharashtra</option>
                <option value="TG">Telangana</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value={"GA"}>Goa </option>
                <option value={"GJ"}>Gujarat </option>
                <option value={"HR"}>Haryana </option>
                <option value={"HP"}>Himachal Pradesh</option>
                <option value={"JK"}>Jharkhand </option>
                <option value={"UP"}>Uttar Pradesh</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Zip</label>
            <input type="text" class="form-control" name='zip' value={data.zip} onChange={fun}/>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" />
              <label class="form-check-label" >
                Check me out
              </label>
            </div>
          </div>
        </form>
        <div class="col-12">
            <button class="btn btn-primary" onClick={reg}>Register</button>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Reg