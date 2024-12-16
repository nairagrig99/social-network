import {BrowserRouter as Router, Route, Routes, Link, Outlet} from 'react-router-dom';
import HomePage from "../../pages/HomePage/HomePage.tsx";
import Rent from "../../pages/Rent/Rent.tsx";
import {useEffect, useState} from "react";
import SignIn from "../../Auth/Login/signIn.tsx";
import SignUP from "../../Auth/Registration/SignUP.tsx";
import UserAccount from "../../customer/UserAccount/UserAccount.tsx";
import ProtectedRoute from "../../ProtectedRoute.tsx";
import CartIcon from "../../customer/Carticon.tsx"
import {apiRequest} from "../../Api/api.js";
import LogOut from "../../Auth/LogOut.tsx";
import Cart from "../../customer/Cart.tsx";
import Photos from "../../customer/UserAccount/photos/Photos.tsx";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [signInUser, setSignInUser] = useState([]);
    const [signUpdUsers, setSignUpdUsers] = useState([]);
    const [childData, setChildData] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        (async () => {
            setSignInUser(await apiRequest('login'));
        })();
        (async () => {
            setSignUpdUsers(await apiRequest('registered_user'));
        })();
    }, [childData])

    function handleBackCallback(callback) {
        setChildData(callback);
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <Router>
                <nav className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-2xl font-bold text-blue-600">MyLogo</Link>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex space-x-4 items-center cursor-pointer">
                                <Link to="/"
                                      className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                                <Link to="/rent"
                                      className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Rent</Link>
                                <Link to="/account"
                                      className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                                    My account
                                </Link>

                                <LogOut signInUser={signInUser}
                                        sendBackCallback={handleBackCallback}

                                />

                                <CartIcon onClickEvent={toggleCart}/>

                                <Cart isOpen={isCartOpen} onClickEvent={toggleCart}/>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden items-center">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                                >
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    Mobile Menu
                    {isOpen && (
                        <div className="md:hidden">
                            <Link to="/"
                                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                            <Link to="/rent"
                                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
                            <Link to="/"
                                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Services</Link>
                            <Link to="/"
                                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</Link>
                        </div>
                    )}
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage/>}/>

                    <Route path="/account/*" element={
                        <ProtectedRoute isAuthenticated={signInUser}>
                            <UserAccount user={signInUser[0]}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/account/photos" element={<Photos/>}/>

                    <Route path="/signIn"
                           element={<SignIn allRegisteredUserList={signUpdUsers}
                                            isLogin={signInUser}
                                            sendBackCallback={handleBackCallback}
                           />}/>
                    <Route path="/signUp" element={<SignUP/>}/>
                </Routes>
            </Router>
            <Outlet/>
        </>
    )
}

export default Header;
