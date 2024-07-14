import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';
import ClickWaitButton from './ClickWaitButton';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const { resetPasswordRequest} = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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
            className="p-2 mx-2 w-72 focus:outline-none focus:ring-0"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <ClickWaitButton title='Submit' next={handleEmailSubmit} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailInput;
