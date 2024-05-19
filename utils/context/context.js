import React, { useState, createContext } from 'react';
import * as SQLite from "expo-sqlite";

export const AuthenticatedUserContext = createContext();

export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(SQLite.openDatabase("debarf.db"));
  const [bottomTabSelected, setBottomTabSelected] = useState(0);


  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        setUser,
        db,
        setDb,
        bottomTabSelected,
        setBottomTabSelected,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
