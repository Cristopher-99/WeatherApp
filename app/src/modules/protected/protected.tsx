import {Navigate, useLocation} from "react-router-dom"
import { useCustomSelector } from "../../hooks/redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function validateAccessToken(token: string) : boolean {   
    // Agregar validaciones al token
    if (token.length) return true
    return false;
}
export const ProtectedRoute = (props: { children: JSX.Element; }) => {
    const user = useCustomSelector(({user}) => user.user);
    const location = useLocation();

    if(validateAccessToken(user.accessToken) && user.isAuthenticated && user.name.length) {
        return props.children;
    }
    return <Navigate to={`${BASE_URL}/login`} state={{ from: location}} replace />
};
