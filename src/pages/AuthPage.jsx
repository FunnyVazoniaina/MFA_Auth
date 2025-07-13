import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { login,
  sendOtp
 } from '../api/authApi'; 

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Veuillez valider le reCAPTCHA");
      return;
    }

    try {
      // ✅ Utilise la fonction login() depuis authApi.js
      const response = await login({ username, password, recaptchaToken });

      if (response.success) {

        const userId = response.data.user.id;
        await sendOtp({ userId, method: "email" });
        navigate('/otp'); 
      } else {
        alert(response.message || "Échec de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <div className="mb-4">
          <ReCAPTCHA
            sitekey="6Lcxz38rAAAAAAmQEITGh-JdXhsiBiZWJAzrorRL"
            onChange={token => setRecaptchaToken(token)}
          />
        </div>

        <button
          type="submit"
          disabled={!recaptchaToken}
          className={`w-full py-2 rounded text-white ${
            recaptchaToken ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Se connecter
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
