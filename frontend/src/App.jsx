import { Route,Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Products from "./components/Products"
import ProductDescription from "./components/ProductDescription"
import Cart from "./components/Cart"
import Wishlist from "./components/Wishlist"
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/products/description/:id" element={<ProductDescription/>}></Route>
        <Route path="/products/cart" element={<Cart/>}></Route>
        <Route path="/products/wishlist" element={<Wishlist/>}></Route>
      </Routes>
    </>
  )
}
export default App
