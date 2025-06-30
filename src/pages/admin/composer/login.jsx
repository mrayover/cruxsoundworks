import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/composer');
    } catch (err) {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-serif mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Log In
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
