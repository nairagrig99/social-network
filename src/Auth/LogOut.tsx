import {apiRequest} from "../Api/api.js";
import {useNavigate} from "react-router-dom";

export default function LogOut({signInUser, sendBackCallback}) {
    const navigate = useNavigate();
    const logOutUser = async () => {
        await apiRequest('login/1', '', 'DELETE');
        sendBackCallback('logout');
        await navigate('/signIn');
    }

    return (
        <p className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer"
           onClick={logOutUser}
        >
            Log Out
        </p>
    )
}
