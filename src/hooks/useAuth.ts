import {getUser} from "@/api/auth";
import {useAtom, atom} from "jotai";
import {useEffect} from "react";

export interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
});

const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    if (auth.user) {
      return;
    }
    setAuth((prev) => ({
      ...prev,
      isLoading: true,
    }));

      getUser()
        .then((u) => { loginUser(u.data)}).catch(() => {
         return;
        })
        .finally(() =>
          setAuth((prev) => ({
            ...prev,
            isLoading: false,
          }))
        );
      
  }, []);

  const loginUser = (userData: any) => {
    setAuth({isLoggedIn: true, user: userData, isLoading: false});
    if (!userData.token) {
      return;
    }
    sessionStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setAuth({isLoggedIn: false, user: null, isLoading: false});
    sessionStorage.removeItem("token");
  };

  return {
    isLoggedIn: auth.isLoggedIn,
    user: auth.user,
    loginUser,
    logout,
    isLoading:auth.isLoading
  };
};

export default useAuth;
