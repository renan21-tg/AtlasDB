import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Continentes from "./pages/Continentes"
import Footer from "./components/Footer"
import Header from "./components/Header"


function App() {
  return (
    <BrowserRouter>

    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/continentes" element = {<Continentes />} />
        </Routes>
      </div>

        <Footer />
    </div>
    
    </BrowserRouter>
  )
}

export default App
