import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext();

export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
