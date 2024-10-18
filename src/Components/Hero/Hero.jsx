import React from 'react'
import '../Hero/Hero.css'
import {FaShippingFast} from 'react-icons/fa'
import {BiSupport} from 'react-icons/bi'
import {MdPayment} from 'react-icons/md'
const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero_top">
          <div>
          <h4>Trade-in-offer</h4>
          <h2>Super Value deals</h2>
          <h1>On all products</h1>
          <p>Save more with coupons &amp; up to 70% off!</p>
          </div>
        </div>
        <div className="hero_bottom">
          <div className="hero_content">
            <div className="info_icon"><FaShippingFast className='hero_cc_icon'/></div>
            <div className="detail">
              <h3>Free Shipping</h3>
              <p>Free Shipping on order</p>
            </div>
          </div>
          <div className="hero_content">
            <div className="info_icon"><BiSupport className='hero_cc_icon'/></div>
            <div className="detail">
              <h3>24/7 support</h3>
              <p>Full support on process</p>
            </div>
          </div>
          <div className="hero_content">
            <div className="info_icon"><MdPayment className='hero_cc_icon'/></div>
            <div className="detail">
              <h3>Secure Payment</h3>
              <p>Your Payment is Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
