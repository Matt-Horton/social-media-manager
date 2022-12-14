import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let { currentUser } = useAuthContext();
    let location = useLocation();

    if (!currentUser.id) {
        console.log("Not authenticated, redirecting to login page...");
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};
