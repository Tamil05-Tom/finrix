import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../auth/firebase';
import loginlogo from '../assets/login.png'
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiGmail } from "react-icons/si";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = () => toast.error("Incorrect username and password");
  const navigate = useNavigate();
  const [loading,setLoading]=useState('')
  const[rememberMe,setRememberMe]=useState('')
  const [error,setError]=useState('')

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await logInWithEmailAndPassword(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      notify();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0a0b2e]">
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[#1a1c4e] rounded-full transform translate-x-[-50%] translate-y-[-30%] w-[100%] h-[100%]" />
                    <div className="absolute inset-0 bg-[#2a2c6e] rounded-full transform translate-x-[-30%] translate-y-[20%] w-[80%] h-[80%]" />
                </div>
                <div className="relative z-10 max-w-md w-full mx-auto">
                    <h1 className="text-[#a0a4ff] text-7xl font-bold mb-2">FinRix</h1>
                    <p className="text-[#A0A4FF] text-xl mb-12 tracking-[0.6px] w-[85%] leading-8">Empowering Business</p>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen mx-auto mr-20">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                        <RiMoneyDollarCircleFill size={100} className=' text-[#656ce1]'/>
                            {/* <img src={loginlogo} className=' w-1/2'></img> */}
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Welcome to FinRix: Simplifying <span style={{ color: '#3B4DA7' }}>Invoices</span>
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {error && <div id="error-message" className="mt-2 text-center text-red-500">{error}</div>}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Connect with us</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-4 gap-3">
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <FaLinkedin size={20} />
                                    <span className="sr-only">Sign in with GitHub</span>
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <FaInstagram size={20} />
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <FaWhatsapp size={20} />
                                    <span className="sr-only">Sign in with GitHub</span>
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <SiGmail size={20} />
                                    <span className="sr-only">Sign in with Twitter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer error />
        </div>
    );
}

export default Login;