import React, {  useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword: React.FC< {updatePassword: (newPassword: string) => void }> = ({ updatePassword }) => {
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'verifyPassword') {
      setVerifyPassword(value);
    }
  };

  const handlePasswordBlur = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special symbols.'
      );
    }
  };

  const handleVerifyPasswordBlur = () => {
    if (password !== verifyPassword) {
      toast.error('Passwords do not match.');
    }else {
      updatePassword(password);
    }

  };
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Enter New Password</h2>
        <div className="mb-4 mx-10">
          <input
            className="p-2 mx-2 w-72 border rounded"
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handlePasswordBlur}
          />
          
        </div>
        <div className="mb-4 mx-10">
          <input
            className="p-2 mx-2 w-72 border rounded"
            type="password"
            placeholder="Verify Password"
            name="verifyPassword"
            value={verifyPassword}
            onChange={handleChange}
            onBlur={handleVerifyPasswordBlur}
          />
          
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
