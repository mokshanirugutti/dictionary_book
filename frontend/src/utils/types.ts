import { NavigateFunction } from 'react-router-dom';

interface wordMeaning{
    definition: string;
    example?:string;
  }
  interface definition_type{
    noun?:wordMeaning;
    verb?:wordMeaning;
  }
  interface MeanData {
    id: number;
    word: string;
    definition_data: definition_type;
  }
  interface DefinitionData {
    example: string;
    definition: string;
  }
  
  interface Word {
    id: number;
    word: string;
    definition_data: {
      noun?: DefinitionData;
      verb?: DefinitionData;
      adjective?: DefinitionData;
    };
  }
  
  interface DataItem {
    id: number;
    word: Word;
    search_timestamp: string;
  }


  interface AuthContextType {
    user: string | null;
    loading: boolean;
    login: ({ username, password, navigate }: LoginParams) => void;
    logout: () => void;
    errorMessage:string;
    successMessage:string;
    register :({ username, password,email, navigate }: RegisterParams) => void;
    HandleOtp:({ email, otp, purpose }: HandleOtpParams) => void;
    resetPasswordRequest: ({ email, navigate }: resetPasswordRequestParams) => void;
  }
  

interface CommonParams {
    username: string;
    password: string;
    navigate: NavigateFunction;
}
interface LoginParams extends CommonParams {}
interface RegisterParams extends CommonParams {
    email: string;
}

interface HandleOtpParams {
    email: string;
    otp: string;
    purpose: string;
    navigate : NavigateFunction;
    newpassword?:string;
}

interface resetPasswordRequestParams{
  email:string;
  navigate:NavigateFunction;
}
// export MeanData
export  type { MeanData , DataItem, AuthContextType , RegisterParams, HandleOtpParams,LoginParams,resetPasswordRequestParams};