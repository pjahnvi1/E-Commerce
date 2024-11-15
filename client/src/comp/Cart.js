import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
  let [data,setData] = useState([])
  let obj = useContext(Ct)
  let navigate = useNavigate()
  let [ctotal,setCtotal] = useState(0)
  let [f,setF] = useState(true)
  useEffect(()=>{
    if(obj.store.token == ""){
      navigate("/login")
    }
    else{
      axios.get(`http://localhost:5000/getCart/${obj.store._id}`).then((res)=>{
        setData(res.data)
        let s = 0
        for(let i in res.data){
          s = s + res.data[i].price * res.data[i].qty
        }
        setCtotal(s)
        obj.storeUpd({"cartTotal":data.length})
      })
    }
  },[f])

  let del = (cid)=>{
    axios.delete(`http://localhost:5000/del/${cid}`).then(()=>{
      setF(!f)
    })
  }

  let dec = (cid,qty)=>{
    if(qty==1){
      del(cid)
    }
    else{
      axios.get(`http://localhost:5000/dec/${cid}`).then(()=>{
        setF(!f)
      })
    }
  }

  let inc = (cid,qty)=>{
    if(qty<10){
      axios.get(`http://localhost:5000/inc/${cid}`).then(()=>{
        setF(!f)
      })
    }
  }
  return (
    <div className='cartCon'>
        {data.length == 0 && <div className='cart-empty'>Cart is Empty</div>}
        {data.length != 0 && <div className='cart-con'>
        {
          data.map((item)=>{
            return (
              <div class="row g-0">
                <div class="cart-img col-md-4">
                  <img src={`http://localhost:5000/prodimgs/${item.pimg}`} class="img-fluid rounded-start"  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <p class="card-text">Price: ₹ {item.price}</p>
                    <p class="card-text"><small class="text-body-secondary"><button onClick={()=>dec(item._id,item.qty)}>-</button> <button className="qty">{item.qty}</button> <button onClick={()=>inc(item._id,item.qty)}>+</button></small></p>
                    <div className='final-amt'>
                      <p class="card-text">Amount: ₹ {item.price*item.qty}</p>
                      <button onClick={()=>del(item._id)}><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>} 
        {data.length != 0 && <div className='checkout'>
          <h4>Check Out</h4><hr></hr>
          {data.length >0 && <div>Total Amount: ₹ {ctotal}</div>}
          <button class="btn btn-primary">Proceed to Buy</button>
        </div>}
    </div>
  )
}

export default Cart