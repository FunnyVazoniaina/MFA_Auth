import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

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
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, recaptchaToken }),
      });

      const data = await res.json();
      if (res.ok) {
        // Naviguer vers OTP après succès login + reCAPTCHA
        navigate('/otp');
      } else {
        alert(data.message || "Échec de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded"
        />
        
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="VOTRE_SITE_KEY" // ⛳ Remplacez ici avec votre clé publique Google
            onChange={(token) => setRecaptchaToken(token)}
          />
        </div>

        <button
          type="submit"
          disabled={!recaptchaToken}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
