import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import { useAuth } from './auth/authProvider';
import Register from "./auth/Register";
import OTPValidation from "./auth/OtpValidation";
import EmailInput from "./components/EmailInput";

function App() {
  const { user, loading } = useAuth();

  // console.log('user in App:', user);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/otp" element={<OTPValidation email="user@example.com" purpose="" />} />
        <Route path="/email" element={<EmailInput/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
