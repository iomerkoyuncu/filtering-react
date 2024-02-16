import Home from './pages/Home'
import Product from './pages/Product'
import ShoppingCart from './pages/ShoppingCart'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
