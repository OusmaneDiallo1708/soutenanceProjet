import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import Profil from "../../pages/Profil"
function Index() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/profil" element={<Profil />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Index