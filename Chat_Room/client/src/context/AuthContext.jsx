import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading,  setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",

    });

    // logininfo
    const [loginError, setLoginError] = useState(null);
    const [isloginLoading,  setIsLoginLoading] = useState(false);
    const [loginInfo, setloginInfo] = useState({
        name: "",
        email: "",
    });

    console.log(`User`, user);

    useEffect(() =>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    }, []
    );

    // update userInfo

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateloginInfo = useCallback((info) => {
        setloginInfo(info);
    }, []);

    const registerUser = useCallback(async(e) =>  {
        e.preventDefault()

        setIsRegisterLoading(true)
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
        )

        setIsRegisterLoading(false)


        if (response.error){
            setRegisterError(response);
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]
    );

    // implement user loginifo
    const loginUser = useCallback(async(e) => {
        e.preventDefault()

        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );
        setIsLoginLoading(false);

        //handle erro

        if(response.error){
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    }, [loginInfo]);


    const logoutUser = useCallback(() =>{
        localStorage.removeItem("User");
        setUser(null);
        }, [])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        setIsRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateloginInfo,
        isloginLoading
    }}
        >
            {children}
            </AuthContext.Provider>
}