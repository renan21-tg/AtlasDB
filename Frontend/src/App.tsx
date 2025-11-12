import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Continentes from "./pages/Continentes"
import Footer from "./components/Footer"
import Header from "./components/Header"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/continentes" element = {<Continentes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
