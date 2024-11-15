import {BrowserRouter,Routes,Route} from "react-router-dom"
import Nav from "./comp/Nav"
import Home from "./comp/Home"
import Reg from "./comp/Reg"
import Login from "./comp/Login"
import Logout from "./comp/Logout"
import AddProd from "./comp/AddProd"
import Cart from "./comp/Cart"
import Ct from './comp/Ct'
import { useState } from "react"
import "./App.css"
import Knowmore from "./comp/Knowmore"

let App = ()=>{
    let [store,setStore] = useState({"token":"","_id":"","name":"","role":""}) 
    let storeUpd = (obj)=>{
      setStore({...store,...obj})
    }
    
    let obj = {"store":store,"storeUpd":storeUpd}
  return (
    <div>
      <BrowserRouter>
      <Ct.Provider value={obj}>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/reg" element={<Reg/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/addprod" element={<AddProd/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/knowmore" element={<Knowmore/>}/>
        </Routes>
      </Ct.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App