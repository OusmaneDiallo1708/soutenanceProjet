import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignInForm = () => {
  const navigate = useNavigate()
    const [email,setEmail] = useState<string>()
    const [emailErreur,setEmailErre] = useState<string>()
    const [motDepasse,setPasseWord] = useState<string>()
    const [motDepasseErreur,setPasseWordErreur] = useState<string>()
    const handleLogin = async(e:React.FocusEvent)=>{
      e.preventDefault()
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_URL}/api/utilisateur/connexion`,
          {email,motDepasse},
          {withCredentials:true}
        )
        console.log(res)
        navigate('/')
      } catch (error) {
        console.log("Erreur de Connection",error)
      }
    }
  return (
    <div className="flex w-full flex-col">
      <form action="" className="justify-center items-center text-center" id="SigninForm" onSubmit={handleLogin}>
        <h1 className="text-blue-950 text-3xl font-bold border-green-800 
        border-b-4 mb-6">Se Connecter</h1>
        <input className="border border-t-gray-300 rounded px-4 py-2 mb-5  w-full
        focus:outline-none focus:ring-2 focus:ring-green-800" type="text" name="email" value={email} 
        onChange={(e) =>setEmail(e.target.value)}
        placeholder="Email" required /><br />
        <span className="text-red-500 text-sm mb-2 emailErreur">{emailErreur}</span> <br />
        <input className="border border-t-gray-300 rounded px-4 py-2 mb-5  w-full
        focus:outline-none focus:ring-2 focus:ring-green-800" type="text" name="motDepasse" value={motDepasse} 
        onChange={(e)=>setPasseWord(e.target.value)}
        placeholder="motDepasse" /><br />
        <span className="text-red-500 text-sm mb-2 motDepasseErreur">{motDepasseErreur}</span> <br />
        <p className="text-right text-lg text-green-800 mb-4 cursor-pointer">Mot de Pass Oublié ?</p>
        <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-4 w-full hover:bg-blue-700">
          Connexion</button><br />
        <button className="bg-blue-950 text-white text-2xl py-2 rounded mb-4 w-full hover:bg-blue-700">
          Continuer avec Google</button><br />
      </form>
    </div>
  )
}

export default SignInForm