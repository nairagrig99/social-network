import {Navigate} from "react-router-dom";

export default function ProtectedRoute({isAuthenticated, children}) {
    console.log('PROTECTED isAuthenticated',isAuthenticated)
    return isAuthenticated.length > 0 ? children : <Navigate to="/signIn"/>;
};
