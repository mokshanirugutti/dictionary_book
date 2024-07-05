import React, { useEffect, useState } from 'react';
import book_desinged from "../assets/book_desinged.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from './authProvider';
import { toast, ToastContainer } from 'react-toastify';


const Login: React.FC = () => {
  const { login , errorMessage,successMessage,HandleOtp } = useAuth();
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
  useEffect(() => {
    if(errorMessage)
      { toast.error(errorMessage); }
    if(successMessage){
      toast.success(successMessage);
    }
  },[errorMessage, successMessage]);

  const handleSubmit = async () => {
      login({username, password, navigate});
    }
  const handleForgotPassword = () => {
    navigate('/email');
  }

  return (
    <div className="grid justify-items-center content-center min-h-screen min-w-screen">
      <div className="flex border rounded-xl p-10 bg-slate-300">
        <div className="size-72 ">
          <img src={book_desinged} alt="Open Book" />
        </div>
        <div className="w-80 text-center bg-white flex flex-col border rounded-r-2xl ">
          <h1 className="p-3">Login</h1>
          
          <div className="border-black">
            <input
              className="p-2 m-3 border rounded"
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
          <button className='text-sm mt-2' onClick={handleForgotPassword}>Forgot password </button>
          <p className="text-center text-slate-400 mt-1">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
