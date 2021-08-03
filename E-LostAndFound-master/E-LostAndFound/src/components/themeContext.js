import React, {useState} from "react"
const ThemeContext = React.createContext()

function ThemeContextProvider(props){
    const [theme, setTheme] = useState("dark")
    
    const toggleTheme = () => {
        setTheme(prevTheme => {
            return prevTheme === "light" ? "dark" : "light"
            
        })
    }
    
    
    return (
        <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
    
}

export {ThemeContextProvider, ThemeContext}
