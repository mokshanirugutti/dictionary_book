import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const { resetPasswordRequest, errorMessage,successMessage} = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  },[errorMessage,successMessage])

  const handleEmailSubmit = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    resetPasswordRequest({email,navigate});
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
        <div className="mb-6 mx-10 border border-gray-500 rounded-lg">
          <AccountCircleIcon className="mr-2" />
          <input
            className="p-2 mx-2 w-72"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleEmailSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailInput;
