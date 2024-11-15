import React, { useContext, useEffect } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(()=>{
    obj.storeUpd({"token":"","_id":"","name":"","role":""})
    navigate("/login")
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout