import React, { useState, createContext } from 'react';
import * as SQLite from "expo-sqlite";

export const AuthenticatedUserContext = createContext();

export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(SQLite.openDatabase("debarf.db"));
  const [bottomTabSelected, setBottomTabSelected] = useState(0);
  const [session, setSession] = useState(null);

  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        setUser,
        db,
        setDb,
        bottomTabSelected,
        setBottomTabSelected,
        session,
        setSession
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
