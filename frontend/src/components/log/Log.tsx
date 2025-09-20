
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./context/UserContext";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
  const [mode , setMode] =useState<'login'|'register'>('login')
    const handerChange = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        setMode(e.currentTarget.value as 'login' || 'register')
    }
  const { setUser } = useUser();
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [motDepasse, setMotDepasse] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4999/api/utilisateur/connexion",
  //       { email, motDepasse },
  //       { withCredentials: true } // JWT cookies si utilisés
  //     );

  //     if (response.data?.utilisateur) {
  //       setUser(response.data.utilisateur);
  //       navigate("/"); // redirection après login
  //     } else {
  //       setError("Identifiants invalides");
  //     }
  //   } catch {
  //     setError("Erreur de connexion");
  //   }
  // };
  return (
    <div className="bg-blue-950  justify-center flex flex-col">
        <div className=" flex rounded ">
          {/* <div className="absolute m-10 px-7 justify-center">
                <button onClick={handerChange} value='login' className={`text-2xl m-3
                rounded-lg px-3 py-2 ${mode ==='login'? "bg-blue-950 text-white font-semibold border-r-8 border-green-800":"bg-gray-500 rounded-md text-blue-950 font-semibold"}`}>Se Connecter</button>
                <button onClick={handerChange} value='register' className={`text-2xl m-3
                rounded-lg px-3 py-2 ${mode ==='register'? "bg-blue-950 text-white font-semibold border-r-8 border-green-800":"bg-gray-500 rounded-md text-blue-950 font-semibold"}`}>S'Inscrire</button>
          </div> */}
          <div className="flex-col">
          {mode === 'login' && (<SignInForm setIsSingUp={() => setMode("register")}/>)}
          {mode === 'register' && (<SignUpForm setIsLogin={() => setMode("login")}/>)}
          </div>
        </div>
    </div>
  )

};

export default Log;

