import { createContext, useEffect, useState } from "react";
import { CurrentUser } from "../types/auth";

type AuthContextType = {
    currentUser: CurrentUser;
    login: (username: string, password: string) => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
    currentUser: {
        username: "",
    },
    login: (_username, _password) => Promise.resolve(),
};

export const AuthContext = createContext(defaultAuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: JSX.Element;
}) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>(
        defaultAuthContext.currentUser
    );

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    const login = async (username: string, password: string) => {
        const response = await fetch("http://localhost:3001/api/auth/signin", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message);
        } else {
            setCurrentUser(responseBody);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
