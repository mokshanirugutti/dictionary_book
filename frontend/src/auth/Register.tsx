import React, { useState } from 'react';
import book_desinged from "../assets/book_desinged.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from './authProvider';

const Register: React.FC = () => {
  const { register , errorMessage } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async () => {
      register({username,email, password, navigate});
      
    }

  return (
    <div className="grid justify-items-center content-center min-h-screen min-w-screen">
      <div className="flex border rounded-xl p-10 bg-slate-300 shadow-lg">
        <div className="size-80 hidden md:flex">
          <img src={book_desinged} alt="Open Book" className='rounded-l-lg '/>
        </div>
        <div className="w-80 text-center bg-white flex flex-col border rounded-2xl md:rounded-r-2xl md:rounded-none">
          <h1 className="p-4">Register</h1>
          {errorMessage && (
            <div className="text-red-500 font-bold mb-4">{errorMessage}</div>
          )}
          <div className="border-black">
            <input
              className="p-2 m-2 border rounded"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <input
              className="p-2 m-2 border rounded"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={() => {
                // Validate email format using regex
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    setError('Invalid email format'); // Set error message
                  } else {
                    setError(''); // Clear error message if valid
                  }
              }}
            />{error && (
                <div className="text-red-500 font-bold">{error}</div>
              )}
          </div>
          <div className="border-black">
            <input
              className="p-2 m-2 border rounded"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 ml-16" onClick={handleSubmit}>
            Register
          </button>
          <p className="text-center text-slate-400 mt-2 mb-2">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
