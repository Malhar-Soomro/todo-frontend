import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getUser as apiGetUser,
  getUser,
} from "@/api/auth";

export type User = any | null;

export type Auth = {
  isLoggedIn: boolean;
  user: User;
  isLoading: boolean;
};

export interface AuthContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultState = {
  auth: {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  },

  setAuth: (auth: Auth) => {},
} as AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface>(defaultState);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  });

  
  useEffect(() => {
    console.log("auth: ", auth)
    console.log("useEffect inside authContext");
    if (auth.user) {
      console.log("user is logged in");
      // user is logged in
      return;
    }

    setAuth((prev) => ({
      ...prev,
      isLoading: true,
    }));

    getUser()
    .then((response) => {
        console.log("response: ", response)
        setAuth(() => ({isLoggedIn: true, user: response.data, isLoading: false}));

        console.log("auth inside get user", auth)
      })
      .catch(() => {
        return;
      })
      .finally(() => setAuth((prev) => ({...prev, isLoading: false})));
      
  }, [setAuth]);

  const login = async (email: string, password: string) => {
    try {
      setAuth((prev) => ({...prev, isLoading: true}));

      // hit api
      const response = await apiLogin(email, password);

      // update set
      setAuth({isLoggedIn: true, user: response.data, isLoading: false});
      console.log(response.data);
      // console.log("response.data", response.data)
      if (!response.data) {
        console.log("if");
        return;
      }
      sessionStorage.setItem("token", response.data.token);
    } catch (error) {
      setAuth((prev) => ({...prev, isLoading: false}));
      throw error;
    }
  };

  const logout = () => {
    setAuth({isLoggedIn: false, user: null, isLoading: false});
    sessionStorage.removeItem("token");
    return;
  };

  return (
    <AuthContext.Provider value={{auth, setAuth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
