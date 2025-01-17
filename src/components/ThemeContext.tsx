import { createContext, useContext, useState, ReactNode } from "react";


interface ThemeContextProps {
 theme: string;
 toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
 const [theme, setTheme] = useState<string>("light");
 const toggleTheme = () => {
   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
 };


 return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
<div className={`app-theme ${theme}`}>{children}</div>
</ThemeContext.Provider>
 );
};


export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
   throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
};