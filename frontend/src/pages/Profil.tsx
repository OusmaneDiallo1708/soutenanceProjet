import Log from "../components/log/Log"
import logo from "../../public/images/Logo_WS.png"
function Profil() {
  return (
    <div className="bg-blue-600 min-h-screen flex justify-center items-center">
      <div className=" flex" >
        <div className="items-center justify-center bg-blue-950 relative z-0 flex flex-col">
          <h1 className="text-3xl text-white font-bold text-center">Bienvenue Sur Whalleïn Stock</h1>
          <img src={logo} className="w-2/3 " alt="Logo Whalleïn Stock" />
          <p className="text-2xl text-white italic text-center">Vos Embution sont notre priorité</p>
        </div>
        <Log/>
      </div>
    </div>
  )
}

export default Profil