// // src/components/WomenProductList.js
import React, { useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';
import './ProductList.css'; // Assuming you're using the same styles
import { Link } from 'react-router-dom';

import { WomenProductsData } from '../../WomenProductsData';

const WomenProductList = () => {
    const { addToCart } = useContext(ShopContext);
    return (
        <div>
            <div className="product_list">
                <h2>Our Women's Collections</h2>
                <div className="product_grid">
                    {WomenProductsData.map((product) => {
                        const { id, imgUrl, heading, cost, description } = product;
                        return (
                            <div className="product_card" key={id}>
                                <Link to={`/product/${id}`}>
                                    <img src={imgUrl} alt={heading} className='product_img' />
                                    <div className="product_info">
                                        <h4>{heading}</h4>
                                        <p>{cost} {product.rupess}</p>
                                        <p>{description}</p>
                                    </div>
                                </Link>
                                <button onClick={() => addToCart(product, id)} className='add-to-cart'>Add To Cart</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default WomenProductList;

