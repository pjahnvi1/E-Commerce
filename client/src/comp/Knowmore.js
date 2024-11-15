import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Ct from './Ct';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export default function Knowmore() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  let obj = React.useContext(Ct)
  let navigate = useNavigate()
  React.useEffect(()=>{
    if(obj.store.item ==undefined)
    {
        navigate("/login")
    }
  },[]) 
  let [item,setItem] = useState(obj.store.item)
  
  let tfr = React.useRef("")
  let addcom = ()=>{
    let data = {"pid":item._id,"name":obj.store.name,"text":tfr.current.value,"rt":value}
    axios.put("http://localhost:5000/addcom",data).then((res)=>{
        setItem(res.data)
    })
  }

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

  return (<>
   {obj.store.item!=undefined&& <div className='km-main'>
        <div className='km-con'>
            <div className='km-img'>
                <img src={`http://localhost:5000/prodimgs/${item.pimg}`}/>
            </div>
            <div className='km-body'>
                <h3>{item.name}</h3>
                <p>{item.cat}</p>
                <p className='km-price'>₹ {item.price}</p>
                <p>{item.desc}</p>
                <button class="btn btn-primary km-add-to-cart" onClick={()=>addcart(item)}>Add to Cart</button>
                <button class="btn btn-primary km-buy-now">Buy Now</button>
            </div>
        </div>
        <br></br>
        <hr></hr>
        <div className='km-rt'>
            {item.comm != "" && <h3>Customer reviews</h3>}
            {
                item.comm.map((ele)=>{
                    return (
                        <div>
                            <h5>{ele.name}</h5>
                            <p>{ele.text}</p>
                            <Rating name="half-rating-read" defaultValue={ele.rt} precision={0.5} readOnly />
                        </div>
                    )
                })
            }
        </div>
        <br></br>
        {obj.store.token != "" && <h3>Create a review</h3>}
        {
            obj.store.token != "" && <div className='km-rt-given'>
                <textarea placeholder='Enter your review' ref={tfr}></textarea>
                <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <button class="btn btn-primary" onClick={addcom}>Post Comment</button>
            </div>
        }
    </div>}
  </>);
}
