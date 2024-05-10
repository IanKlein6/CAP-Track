import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = { user, setUser };


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
