import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token')) || null;
    const [userName, setUserName] = useState(localStorage.getItem('userName')) || '';

    const login = (token, userName) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        setToken(token);
        setUserName(userName);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setToken(null);
        setUserName('');
    }

    return (
        <AuthContext.Provider value={{ token, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}