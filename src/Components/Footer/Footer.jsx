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
            <h2>E-Comm-Messive</h2>
            </div> 
            <div className="footer_socials">
                <FaFacebook className="footer_icon"/>
                <BsInstagram className="footer_icon"/>
                <BsTwitch className="footer_icon"/>
            </div>
        </div>
        <div className="copy">
        <p>Copyright E-comm-Messive 2024. all rights reserved </p>
      </div>   
      </div>
      
    </div>
  )
}

export default Footer
