import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";
import { getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await login({ email, password });
      setUser(response.user);
      return response;
    } catch (error) {
      console.log("Login Error in Context:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const response = await register({ username, email, password });
      console.log("Register Response:", response);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log("Register Error in Context:", error);
      throw error;
      
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log("Logout Error in Context:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
