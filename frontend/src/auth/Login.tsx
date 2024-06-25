import React, { useState } from 'react';
import book_desinged from "../assets/book_desinged.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from './authProvider';

const Login: React.FC = () => {
  const { login , errorMessage } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
      login(username, password, navigate);
    }

  return (
    <div className="grid justify-items-center content-center min-h-screen min-w-screen">
      <div className="flex border rounded-xl p-10 bg-slate-300">
        <div className="size-72 ">
          <img src={book_desinged} alt="Open Book" />
        </div>
        <div className="w-80 text-center bg-white flex flex-col border rounded-r-2xl ">
          <h1 className="p-4">Login</h1>
          {errorMessage && (
            <div className="text-red-500 font-bold mb-4">{errorMessage}</div>
          )}
          <div className="border-black">
            <input
              className="p-2 m-4 border rounded"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="border-black">
            <input
              className="p-2 m-4 border rounded"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 ml-16" onClick={handleSubmit}>
            Login
          </button>
          <p className="text-center text-slate-400 mt-4">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
