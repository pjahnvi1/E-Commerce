import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Ct from './Ct'

const AddProd = () => {
  let [data,setData] = useState({"name":"","cat":"","price":"","desc":"","pimg":""})
  let navigate = useNavigate()
  let [msg,setMsg] = useState("")
  let obj = useContext(Ct)

  useEffect(()=>{
    if(obj.store.role != "admin")
    {
      navigate("/login")
    }
  },[])

  let fun = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let fun1 = (e)=>{
    setData({...data,"pimg":e.target.files[0]})
  }

  let add = ()=>{
    let fd = new FormData()
    for(let p in data)
    {
      fd.append(p,data[p])
    }
    axios.post("http://localhost:5000/add",fd).then((res)=>{
      setMsg(res.data.msg)
      navigate("/")
    }).catch((err)=>{
      setMsg("Error in Adding product")
    })
  }

  return (
    <div className='addp-formcon'>
      <div className='addp-form'>
        <div>{msg}</div>
          <form class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Product Name</label>
              <input type="text" placeholder='enter product name' name='name' value={data.name} onChange={fun} class="form-control"/>
            </div>
            <div class="col-md-6">
              <label  class="form-label">Category</label>
              <input type="text" placeholder='enter category' name='cat' value={data.cat} onChange={fun} class="form-control"/>
            </div>
            <div class="col-md-6">
              <label  class="form-label">Description</label>
              <textarea type="text" placeholder='enter description' name='desc' value={data.desc} onChange={fun} class="form-control"/>
            </div>
            <div class="col-md-6">
              <label  class="form-label">Price</label>
              <input type='text' placeholder='enter price' name='price' value={data.price} onChange={fun} class="form-control"/>
            </div>
            <div class="col-12">
              <label  class="form-label">Product image</label>
              <input type="file" name='pimg' onChange={fun1} class="form-control"/>
            </div>
          </form>
          <div class="col-12">
            <button class="btn btn-primary" onClick={add}>Add Product</button>
          </div>
      </div>
    </div>
  )
}

export default AddProd