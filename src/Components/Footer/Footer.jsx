import React from 'react'
import {FaFacebook} from 'react-icons/fa'
import { BsInstagram, BsTwitch } from 'react-icons/bs'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer_content">
           <div className="footer_name">
            <h2>E-Com-Massive</h2>
            </div> 
            <div className="footer_socials">
                <FaFacebook className="footer_icon"/>
                <BsInstagram className="footer_icon"/>
                <BsTwitch className="footer_icon"/>
            </div>
        </div>
        <div className="copy">
        <p>6302725154</p>
        <p>E-com massive@gmail.com</p>
        <p>Copyright E-com-Messive 2024. all rights reserved </p>

      </div>   
      </div>
      
    </div>
  )
}

export default Footer
