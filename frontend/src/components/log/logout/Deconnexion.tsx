import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // si tu utilises react-router
import axios from "axios";

const Deconnexion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Appel à ton endpoint backend pour supprimer le cookie JWT
        const response = await axios.get("http://localhost:4999/api/utilisateur/logout", {
          withCredentials: true, // très important pour les cookies
        });

        if (response.status === 200) {
          console.log(response.data.message); // "Déconnexion réussie"
          // Redirection vers la page de connexion
          navigate("/profil");
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-600 text-lg font-medium">Déconnexion en cours...</p>
    </div>
  );
};

export default Deconnexion;
