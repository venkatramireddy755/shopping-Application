import React, { useContext } from 'react';
import { BiCart, BiUser } from 'react-icons/bi';
import './Navbar.css';
import { Link,useNavigate } from 'react-router-dom';
import { ShopContext } from '../ShopContext/ShopContext';

const Navbar = () => {



  const navigate = useNavigate();
  const handleSelect = (event) => {
    const selected = event.target.value;
    if (selected === 'Women') {
      navigate('/women');
    }
    if (selected === 'Men') {
      navigate('/men');
    }
  };





  window.addEventListener('scroll',function(){
        const navbar = document.querySelector('.navbar')
        navbar.classList.toggle("active", window.scrollY > 100)
      })
  const { itemAmount, username, setUser } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <h2>E-Com-Massive</h2>
        </div>
        <div className="link">
          <ul>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <li>
              <select className='dropdown' onChange={handleSelect}>
                <option value="Category"  selected>Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              
              </select>
            </li>
            <Link to='/contact-us'>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div className="nav_icon_wrapper">
          <Link to='/cart'>
            <div className="nav_cart">
              <BiCart className='nav_icon' />
              <p className="nav_cart_amount">{itemAmount}</p>
            </div>
          </Link>
          <div className="nav_user">
            {username ? (
              <>
                <span className="nav_username">Hi,{username}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to='/login'>
                <BiUser className='nav_icon' />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

