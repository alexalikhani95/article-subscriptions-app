import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  data: {
    id: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
  { data: null, loading: true, error: null },
  () => {},
]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  // ensure token is inside of the header
  const token = localStorage.getItem("token");
  // Add the token to every request by having a default configuration
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`; //Set all of the request headers to have this if there is a token
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get("http://localhost:5001/auth/me"); // Get the current user logged in

    if (response && response.data.user) {
      // If data exists and there is a user in the data
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
