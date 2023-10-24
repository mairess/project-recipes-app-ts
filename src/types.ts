export type AppContextType = {
  loginData: {
    email: string;
    password: string;
  },
  setLoginData: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
  }>>
};

export type AppProviderProps = {
  children: React.ReactNode;
};
