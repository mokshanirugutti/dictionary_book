import React, { useEffect, useState } from 'react';
import book_desinged from "../assets/book_desinged.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from './authProvider';
import { toast, ToastContainer } from 'react-toastify';


const Login: React.FC = () => {
  const { login , errorMessage,successMessage } = useAuth();
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
    <div className="grid justify-items-center content-center h-screen w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 border rounded-2xl shadow-xl bg-white w-fit place-items-center">
        <div className="size-80 hidden md:grid rounded-lg ml-3"> 
          <img src={book_desinged} alt="Open Book" className='border rounded-lg' />
        </div>
        <div className="w-auto text-center  flex flex-col items-center   rounded-2xl md:rounded-r-2xl md:rounded-none md:-ml-7 p-5">
          <h1 className="pt-5">Login</h1>
          
          <div className="border-black">
            <input
              className="p-2 m-3 border rounded-md"
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
          <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-20 rounded w-auto" onClick={handleSubmit}>
            Login
          </button>
          <button className='text-sm mt-2' onClick={handleForgotPassword}>Forgot password </button>
          <p className="text-center text-slate-400 mt-1 pb-5">
            Don't have an account?
            <a href="/register" className="underline-animation"> Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
