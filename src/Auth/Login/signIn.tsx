import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiRequest} from "../../Api/api.js";

export default function SignIn({allRegisteredUserList, isLogin,sendBackCallback}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isLogin.length > 0) {
            navigate('/account')
        }
    }, [isLogin])

    const handleLogin = async (event) => {
        event.preventDefault();
        for (const user of allRegisteredUserList) {
            if (user.email === formData.email && user.password === formData.password) {
                await apiRequest('login', user, 'POST');
                sendBackCallback('login');
                await navigate("/account");

                console.log('navigate to account')
            }
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            required

                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button

                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don't have an account?{' '}
                        <Link to="/signUp"

                              className="text-blue-500 hover:text-blue-700 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
