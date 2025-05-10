import React from "react";

interface AppContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an initial value of undefined (best practice)
const AppContext = React.createContext<AppContextType | undefined>(undefined);

export default AppContext;
