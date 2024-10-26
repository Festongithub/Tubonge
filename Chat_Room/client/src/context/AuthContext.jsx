import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading,  setRegisterLoading] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",

    });
    console.log(`User`, user);

    useEffect(() =>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
    }}
        >
            {children}
            </AuthContext.Provider>
}