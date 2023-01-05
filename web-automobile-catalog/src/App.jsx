import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Car from "./pages/Car"
import Form from "./pages/Form"
import { AppBar } from './components/AppBar'
import { Footer } from './components/Footer'

function App() {
  return (
    <BrowserRouter >
      <AppBar />

      <Routes>
        <Route path="/"index element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/car/:id" element={<Car />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/form/:id" element={<Form />}></Route>
      </Routes>
      
      <Footer />

    </BrowserRouter>
  )
}

export default App
