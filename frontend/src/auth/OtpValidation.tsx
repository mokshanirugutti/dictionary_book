import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './authProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
interface OTPValidationProps {
  email: string;
  purpose: string
}

const OTPValidation: React.FC<OTPValidationProps> = () => {
  const location = useLocation();
  const { email, purpose } = location.state || { email: '', purpose: '' };

  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState('')
  const {HandleOtp,errorMessage,successMessage, resetPasswordRequest} = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState<number>(45);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);

  useEffect(() =>{
      if(errorMessage){
        toast.error(errorMessage)
      }else if (successMessage){
        toast.success((successMessage))
      }
  },[errorMessage,successMessage])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box if the value is not empty and not the last input
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move to the previous input box if backspace is pressed and the current input is empty
      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      toast.error('Invalid OTP. Please enter all 6 digits.');
    } else {
      // console.log('logging in otp validation for password');
      // console.log(email,otp,purpose,newpassword);
      HandleOtp({email,otp:otpValue,purpose,navigate,newpassword});
    }
  };
  

  const handleResendOTP = () => {
    setOtp(Array(6).fill(''));
    setTimer(45);
    setIsResendEnabled(false);
    resetPasswordRequest({email,navigate});
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">OTP Validation</h2>
        <p className="mb-6 mr-10 ml-10 border border-gray-500 rounded-lg">
          <AccountCircleIcon className="mr-2" />
          {email}
        </p>
        {purpose === 'verify-password-reset' && <ResetPassword updatePassword ={setNewPassword}/>}
        <div className='flex flex-col'>
        <div className="flex justify-center mb-2">
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={otp[index]}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 mx-1 text-center text-lg border rounded"
            />
          ))}
        </div>
        <div className='self-end'>
        <button
          onClick={handleResendOTP}
          className={`mt-1  py-2 text-sm  text-blue-400 rounded hover:text-blue-500 ${
            isResendEnabled ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isResendEnabled}
        >
          {isResendEnabled ? 'Resend OTP' : `Resend OTP in ${timer}s`}
        </button>
        </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default OTPValidation;
