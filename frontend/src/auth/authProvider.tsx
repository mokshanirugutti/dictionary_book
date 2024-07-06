import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { url } from "../hooks/useAuth";

import {
  AuthContextType,
  LoginParams,
  RegisterParams,
  HandleOtpParams,
  resetPasswordRequestParams,
} from "../utils/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    // Check localStorage for a token on mount
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("username");
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ username, password, navigate }: LoginParams) => {
    const response = await fetch(`${url}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username); // Store username
      setUser(username);
      navigate("/");
    } else if (data.error) {
      console.error("Invalid credentials");
      setErrorMessage("Invalid credentials");
    } else {
      console.error("unexpteced happened");
    }
  };
  const register = async ({username, password, email, navigate }: RegisterParams) => {
    // console.log(`registration deatils email ${email}`);
    const response = await fetch(`${url}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (data.message) {
      navigate("/otp", {
        state: { email: email, purpose: "verify-registration-otp" },
      });
    }
    if (data.error) {
      setErrorMessage(data.error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove stored username
  };

  const HandleOtp = async ({email, otp, purpose, navigate, newpassword }: HandleOtpParams) => {
    // console.log('the props handle otp got ');
    // console.log(email, otp, purpose,newpassword);
    // verify-registration-otp/
    interface bodyPorps {
      email: string;
      otp: string;
      new_password?: string;
    }
    const body: bodyPorps = {
      email,
      otp,
    };
    
    if (newpassword) {
      body.new_password = newpassword;
    }
    // console.log(`request will be sent to ${purpose} with `);  
    // console.log(body)
    
    const response = await fetch(`${url}/api/${purpose}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // console.log(data);
    if (data.error) {
      setErrorMessage(data.error);
    }
    if (data.message) {
      setSuccessMessage(data.message);
      navigate("/login");
    }
  };
  const resetPasswordRequest = async ({
    email,
    navigate,
  }: resetPasswordRequestParams) => {
    // console.log(`sent to ${url}/api/request-password-reset/`)
    const response = await fetch(`${url}/api/request-password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.error) {
      setErrorMessage(data.error);
    }
    if (data.message) {
      setSuccessMessage(data.message);
      navigate("/otp", {
        state: { email: email, purpose: "verify-password-reset" },
      });
    }

    
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        errorMessage,
        register,
        HandleOtp,
        successMessage,
        resetPasswordRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
