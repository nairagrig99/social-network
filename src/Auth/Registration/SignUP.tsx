import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {apiRequest} from "../../Api/api.js"

export default function SignUP() {

    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const getUserList = await apiRequest('registered_user');

        const hasUser = [];

        for (const [index, user] of getUserList.entries()) {

            try {
                if (user.email !== formData.email) {
                    hasUser.push(formData);
                } else {
                    throw new Error('User Already Exist')
                }

            } catch (err) {
                hasUser.length = 0;
                setError(err.message);
                break;
            }
        }

        if (hasUser.length > 0) {
            await apiRequest('registered_user', formData, 'POST');
            navigate("/signIn");
        }
    }


    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <p className="text-center text-gray-600 text-sm mt-4">
                            Do you already have an account ?{' '}
                            <Link to="/signIn" className="text-blue-500 hover:text-blue-700 font-semibold">
                                Sign In
                            </Link>
                        </p>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
