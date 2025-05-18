import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Customers from "./pages/Customer"
import Employee from "./pages/Employee"
import Product from "./pages/Product"
import Orders from "./pages/Order"

function App() {

  return (
    <Router>      
     <Navbar></Navbar>
     <Routes>
      <Route path="/customer" element={<Customers/>}></Route>
      <Route path="/employees" element={<Employee/>}></Route>
      <Route path="/products" element={<Product/>}></Route>
      <Route path="/orders" element={<Orders/>}></Route>
     </Routes>
    </Router>
  )
}

export default App
