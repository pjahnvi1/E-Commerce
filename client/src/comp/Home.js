import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import img1 from "./carousel-1.jpg"
import img2 from "./carousel-2.jpg"
import img3 from "./carousel-3.jpg"
import img4 from "./carousel-4.jpg"
import img5 from "./carousel-5.jpg"

const Home = () => {
  let [data,setData] = useState([])
  let obj = useContext(Ct)
  let navigate = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:5000/getProd").then((res)=>{
      setData(res.data)
    })
  },[])

 let addcart = (item)=>{
  if(obj.store.token=="")
    {
      navigate("/login")
    }
    else{
    let cartProd = {"uid":obj.store._id,"pid":item._id,"name":item.name,"price":item.price,"pimg":item.pimg,"qty":1}
    axios.post("http://localhost:5000/addCart",cartProd).then((res)=>{
      console.log(res.data)
      navigate("/cart")
    })
  }
  }

  let knowMore = (item)=>{
    obj.storeUpd({"item":item})
    navigate("/knowmore")
  }

  return (
    <div className='home-con' >
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src={img1} class="d-block w-100" />
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src={img2} class="d-block w-100" />
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src={img3} class="d-block w-100" />
          </div>
          <div class="carousel-item" data-bs-interval="4000">
            <img src={img4} class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src={img5} class="d-block w-100" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    <div className='cardCon'>
      {
        data.map((item)=>{
          return (
            <div className='card'> 
              <img src={`http://localhost:5000/prodimgs/${item.pimg}`} class="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className='card-text'>{item.cat}</p>
                <p className="card-text price">₹ {item.price}</p>
                <div className='button'>
                  <button class="btn btn-primary" onClick={()=>knowMore(item)}>Know more ...</button>
                  <button class="btn btn-primary" onClick={()=>addcart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default Home