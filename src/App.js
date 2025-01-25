
import './App.css';
// import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar.jsx';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import Cart from './Components/Cart/Cart.jsx';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';
import NewAccountPage from './Components/Login/NewAccountPage.jsx'; 
import PaymentPage from './Components/PaymentPage/PaymentPage.jsx';
import PaymentFailed from './Components/PaymentPage/PaymentFaild.jsx';
import PaymentSuccess from './Components/PaymentPage/PaymentSuccess.jsx';
import ProductList from './Components/ProductList/ProductList.jsx';
import WomenProductList from './Components/ProductList/WomenProductList.jsx';

import ContactUs from './Components/Contact/ContactUs.jsx'

const App=()=>{
  return(
    <div>
      <Navbar/>
      
      <div className='body'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-account" element={<NewAccountPage />} />
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/create-checkout-session' element={<PaymentPage/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/men"  element={<ProductList/>} />
        <Route path="/women" element={<WomenProductList/>} />
      </Routes>
      </div>
      
      
      
    </div>
    
  )
}

export default App;
