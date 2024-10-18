import React,{useContext}from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import { productsData } from '../../Data'
import { WomenProductsData } from '../../WomenProductsData'
import { ShopContext } from '../../Components/ShopContext/ShopContext'
const ProductDetails = () => {
  const{addToCart}=useContext(ShopContext);

  //get product id
  // const {id}=useParams();

  //get product based on id

  //  const products=productsData.find(products=>{
  //   return products.id===parseInt(id);
  //  })

// Get product id
const { id } = useParams();  // Assuming category param is in the route

// Get product based on id and category
let products = WomenProductsData.find(products => products.id === parseInt(id));

if (!products) {
  products = productsData.find(products => products.id === parseInt(id));
}

if (!products) {
  return <p>Product not found</p>;
}



  return (
    <div>
      <div className="product_details_info">
        <div className="details_left">
          <img src={products.imgUrl} alt={products.heading} />
        </div>
        <div className="details_right">
          <h3>{products.heading}</h3>
          <p className='product_price'>₹{products.cost}</p>
          <p className="desc">{products.description} </p>
          <button onClick={()=>addToCart(products,id)}>ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
