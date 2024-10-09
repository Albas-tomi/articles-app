"use client";
import { createContext, useContext } from "react";

const AppContext = createContext<any>(undefined);
export const AppWrapper = ({ children }: any) => {
  return (
    <AppContext.Provider
      value={{
        data: "halo dunia",
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
