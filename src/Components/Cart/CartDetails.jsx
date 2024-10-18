import React,{useContext} from 'react'
import { ShopContext } from '../ShopContext/ShopContext'
import { FiTrash2 } from 'react-icons/fi'
import {IoMdAdd, IoMdRemove} from 'react-icons/io'
import './Cart.css'

const CartDetails = ({item}) => {
  const{removeFromCart,increaseAmount,decreaseAmount}=useContext(ShopContext)

  const{id, heading,imgUrl,cost,amount}=item
  return (
    <div>
     <div className="cart_item">
      <div className="product_details">
        <img src={imgUrl} alt="" />
        <div className="product_info">
          <h3>{heading}</h3>
          <div onClick={()=>removeFromCart(id)} className="cart_item_remove">
            <FiTrash2/>Remove
          </div>
        </div>
      </div>
      <div className="quantity">
        <button onClick={()=>decreaseAmount(id)} className='quantity_button1'><IoMdRemove/></button>
        <span>{amount}</span>
        {/* <button></button> */}
        <button onClick={()=>increaseAmount(id)} className='quantity_button2'><IoMdAdd/></button>
      </div>
      <div className="price">
        ₹ {cost}
      </div>
      <div className="total">
        {`₹ ${parseFloat(cost*amount).toFixed(2)}`}
      </div>
     </div>
    </div>
  )
}

export default CartDetails
