{/*import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);
  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  );
}*/}
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/profile' ,{
        withCredentials: true,
      })
      .then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}
