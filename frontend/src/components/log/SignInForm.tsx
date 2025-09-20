
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Key, Eye, EyeOff, Mail, Lock } from "lucide-react";
// import { useUser } from "../../components/log/context/UserContext"; // adapte le chemin

// const SignInForm = ({ setIsSingUp }: { setIsSingUp: (val: boolean) => void }) => {
//   const { setUser } = useUser();
//   const navigate = useNavigate();
//   const [mode, setMode] = useState<'login' | 'register'>('login');
//   const [email, setEmail] = useState("");
//   const [motDepasse, setMotDepasse] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:4999/api/utilisateur/connexion",
//         { email, motDepasse },
//         { withCredentials: true }
//       );

//       if (response.data?.utilisateur) {
//         setUser(response.data.utilisateur);
//         navigate("/"); // redirection après login
//       } else {
//         setError("Identifiants invalides");
//       }
//     } catch {
//       setError("Erreur de connexion");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSwitchToSignUp = () => {
//     setIsSingUp(true);
//     setMode('register');
//   };

//   return (
//     <div className="w-[60vh]">
//       <div className="bg-white py-[11.3vh] shadow-xl p-8 rounded-tl-[18vh]">
//         <div className="text-center mb-6">
//           <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full 
//           flex items-center justify-center mx-auto mb-4">
//             <Key className="text-white" size={28} />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Se Connecter</h1>
//           <p className="text-gray-600">Accédez à votre espace personnel</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Adresse email"
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
//               focus:ring-green-600 focus:border-green-600 transition-all duration-200"
//               required
//             />
//           </div>

//           {/* Mot de passe */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={motDepasse}
//               onChange={(e) => setMotDepasse(e.target.value)}
//               placeholder="Mot de passe"
//               className="w-full pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200"
//               required
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400" />
//               )}
//             </button>
//           </div>

//           {/* Bouton connexion */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-blue-950 to-green-800 text-white py-2 rounded-lg font-semibold hover:from-blue-900 
//             hover:to-green-900 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Connexion...
//               </span>
//             ) : "Se Connecter"}
//           </button>
//         </form>

//         {/* Séparateur */}
//         <div className="relative flex items-center mt-4">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="flex-shrink mx-4 text-gray-600 text-sm">Ou</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>
        
//         {/* Bouton Google */}
//         <button
//           type="button"
//           disabled={isLoading}
//           className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold 
//           hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center justify-center mt-4"
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
//             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//           </svg>
//           Continuer avec Google
//         </button>

//         <div className="text-center mt-4">
//           <p className="text-gray-600 text-sm">
//             Vous n'avez pas de compte?{" "}
//             <button 
//               onClick={handleSwitchToSignUp} 
//               className="text-green-600 hover:text-green-800 font-medium"
//             >
//               S'inscrire
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Key, Eye, EyeOff, Mail, Lock, XCircle, CheckCircle } from "lucide-react";
import { useUser } from "../../components/log/context/UserContext";

const SignInForm = ({ setIsSingUp }: { setIsSingUp: (val: boolean) => void }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [motDepasse, setMotDepasse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    motDepasse: ""
  });

  const showNotificationMessage = (message: string, type: "success" | "error") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const validateForm = () => {
    const errors = {
      email: "",
      motDepasse: ""
    };
    
    let isValid = true;
    
    // Validation email
    if (!email) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Format d'email invalide";
      isValid = false;
    }
    
    // Validation mot de passe
    if (!motDepasse) {
      errors.motDepasse = "Le mot de passe est requis";
      isValid = false;
    } else if (motDepasse.length < 6) {
      errors.motDepasse = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }
    
    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotificationMessage("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4999/api/utilisateur/connexion",
        { email, motDepasse },
        { withCredentials: true }
      );

      if (response.data?.utilisateur) {
        setUser(response.data.utilisateur);
        showNotificationMessage("Connexion réussie! Veiller patiente...", "success");
        
        // Redirection après un court délai pour voir la notification
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Identifiants invalides");
        showNotificationMessage("Identifiants invalides", "error");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erreur de connexion";
      setError(errorMessage);
      showNotificationMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignUp = () => {
    setIsSingUp(true);
    setMode('register');
  };

  return (
    <div className="w-[60vh] relative">
      {/* Notification élégante */}
      {showNotification && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-4/5 animate-fade-in-down ${
          notificationType === "success" 
            ? "bg-gradient-to-r from-green-500 to-green-600" 
            : "bg-gradient-to-r from-red-500 to-red-600"
        } text-white p-4 rounded-lg shadow-lg flex items-center justify-between`}>
          <div className="flex items-center">
            {notificationType === "success" ? (
              <CheckCircle className="w-6 h-6 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 mr-2" />
            )}
            <span className="font-medium">{notificationMessage}</span>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="text-white hover:text-gray-200 ml-4"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="bg-white py-[11.3vh] shadow-xl p-8 rounded-tl-[18vh]">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full 
          flex items-center justify-center mx-auto mb-4">
            <Key className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Se Connecter</h1>
          <p className="text-gray-600">Accédez à votre espace personnel</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors({...fieldErrors, email: ""});
                }
              }}
              placeholder="Adresse email"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 
              focus:ring-green-600 focus:border-green-600 transition-all duration-200 ${
                fieldErrors.email ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <XCircle className="w-3 h-3 mr-1" />
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={motDepasse}
              onChange={(e) => {
                setMotDepasse(e.target.value);
                if (fieldErrors.motDepasse) {
                  setFieldErrors({...fieldErrors, motDepasse: ""});
                }
              }}
              placeholder="Mot de passe"
              className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 ${
                fieldErrors.motDepasse ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {fieldErrors.motDepasse && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <XCircle className="w-3 h-3 mr-1" />
                {fieldErrors.motDepasse}
              </p>
            )}
          </div>

          {/* Bouton connexion */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-950 to-green-800 text-white py-2 rounded-lg font-semibold hover:from-blue-900 
            hover:to-green-900 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
            ) : "Se Connecter"}
          </button>
        </form>

        {/* Séparateur */}
        <div className="relative flex items-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-sm">Ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Bouton Google */}
        <button
          type="button"
          disabled={isLoading}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold 
          hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center justify-center mt-4"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas de compte?{" "}
            <button 
              onClick={handleSwitchToSignUp} 
              className="text-green-600 hover:text-green-800 font-medium"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignInForm;