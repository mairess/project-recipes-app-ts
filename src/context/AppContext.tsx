import { createContext, useState } from 'react';
import { AppContextType, AppProviderProps } from '../types';

export const AppContext = createContext({} as AppContextType);

export function AppProvider({ children }: AppProviderProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  return (
    <AppContext.Provider value={ { loginData, setLoginData } }>
      {children}
    </AppContext.Provider>
  );
}
