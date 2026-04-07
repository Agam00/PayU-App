import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/src/storage/auth";

type AuthType = {
  user: any;
  setUser: (user: any) => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
