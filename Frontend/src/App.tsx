import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Continentes from "./pages/Continentes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/continentes" element = {<Continentes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
