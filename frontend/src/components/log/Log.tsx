import React, {useState} from "react"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
const Log = () => {
    const [mode , setMode] =useState<'login'|'register'>('login')
    const handerChange = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        setMode(e.currentTarget.value as 'login' || 'register')
    }
  return (
    <div className="bg-gray-300 justify-center flex flex-col p-10">
        <div className=" flex gap-4 p-8 rounded ">
                <button onClick={handerChange} value='login' className={`text-2xl m-3
                rounded-lg px-3 py-2 ${mode ==='login'? "bg-blue-950 text-white font-semibold border-r-8 border-green-800":"bg-gray-500 rounded-md text-blue-950 font-semibold"}`}>Se Connecter</button>
                <button onClick={handerChange} value='register' className={`text-2xl m-3
                rounded-lg px-3 py-2 ${mode ==='register'? "bg-blue-950 text-white font-semibold border-r-8 border-green-800":"bg-gray-500 rounded-md text-blue-950 font-semibold"}`}>S'Inscrire</button>
        </div>
        {mode === 'login' && (<SignInForm/>)}
        {mode === 'register' && (<SignUpForm/>)}
    </div>
  )
}

export default Log