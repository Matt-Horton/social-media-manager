import { createContext, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../types/auth";

type AuthContextType = {
    currentUser: CurrentUser;
    login: (username: string, password: string) => Promise<any>;
};

const defaultAuthContext: AuthContextType = {
    currentUser: {
        id: undefined,
        username: "",
    },
    login: (_username, _password) => Promise.resolve(),
};

export const AuthContext = createContext(defaultAuthContext);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>(
        defaultAuthContext.currentUser
    );

    useEffect(() => {
        console.log("Current user has changed");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    const login = (username: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(
                "http://localhost:3001/api/auth/signin",
                {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );

            const responseBody = await response.json();

            if (!response.ok) {
                reject(responseBody.message);
            }

            setCurrentUser(responseBody);
            resolve(responseBody);
        });
    };

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
