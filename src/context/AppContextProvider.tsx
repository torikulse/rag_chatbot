"use client";
import React, { useState, ReactNode } from "react";
import AppContext from "./AppContext";

// Define the type for the context value
interface AppContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the props for the provider
interface AppContextProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const contextValue: AppContextType = {
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
