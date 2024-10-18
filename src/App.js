
import './App.css';
// import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage';
import Footer from './Components/Footer/Footer';
import LoginPage from './Components/Login/LoginPage';
import NewAccountPage from './Components/Login/NewAccountPage'; 
import PaymentPage from './Components/PaymentPage/PaymentPage';
import PaymentFailed from './Components/PaymentPage/PaymentFaild';
import PaymentSuccess from './Components/PaymentPage/PaymentSuccess';
import ProductList from './Components/ProductList/ProductList';
import WomenProductList from './Components/ProductList/WomenProductList';
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
        <Route path='/contact-us' element={<Footer/>}/>
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
