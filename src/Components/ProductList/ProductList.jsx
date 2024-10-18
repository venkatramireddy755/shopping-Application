import React,{ useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';
import './ProductList.css'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const {products, addToCart}=useContext(ShopContext);
  return (
    <div>
      <div className="product_list">
        <h2>Our Eligant Collections</h2>
        <div className="product_grid">
            {products.map((products)=>{
                //destructure product
                const{id,imgUrl,heading,cost,description}=products;
                return(
                    <div className="product_card" key={id}>
                      <Link to={`/product/${products.id}`} key={products.id}>
                          <img src={imgUrl} alt="" className='product_img'/>
                          <div className="product_info">
                              <h4>{heading}</h4>
                              <p>₹{cost}</p>
                              <p>{description}</p>
                          </div>
                        </Link>
                        <button onClick={()=>addToCart(products, id)} className='add-to-cart'>Add To Cart</button>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default ProductList
