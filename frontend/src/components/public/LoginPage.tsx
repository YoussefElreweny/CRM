
import React, { useState } from 'react';
import { UserRole, User } from '../../types';
import { APP_NAME } from '../../constants';
import * as authService from '../../services/auth.service';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Register State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regError, setRegError] = useState('');
    const [regLoading, setRegLoading] = useState(false);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError('Please enter both email and password.');
            return;
        }

        setLoginError('');
        setLoginLoading(true);

        try {
            const user = await authService.login({
                email: loginEmail,
                password: loginPassword,
            });

            onLogin(user);
        } catch (error) {
            setLoginError(error instanceof Error ? error.message : 'Login failed. Please try again.');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !regEmail || !regPassword || !confirmPassword) {
            setRegError('All required fields must be filled.');
            return;
        }

        if (regPassword !== confirmPassword) {
            setRegError('Passwords do not match.');
            return;
        }

        if (regPassword.length < 6) {
            setRegError('Password must be at least 6 characters long.');
            return;
        }

        setRegError('');
        setRegLoading(true);

        try {
            const user = await authService.register({
                name: `${firstName} ${lastName}`,
                email: regEmail,
                password: regPassword,
                companyName: companyName || undefined,
            });

            onLogin(user);
        } catch (error) {
            setRegError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
        } finally {
            setRegLoading(false);
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setLoginError('');
        setRegError('');
    }


    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Visual (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 text-white flex-col justify-between p-12 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-2 text-2xl font-bold mb-8">
                        <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-900">⚡</span>
                        <span>{APP_NAME}</span>
                    </div>
                    <h2 className="text-5xl font-extrabold leading-tight mb-6">
                        {isLoginView ? "Automate your growth with AI." : "Join the future of CRM."}
                    </h2>
                    <p className="text-lg text-indigo-200 max-w-md">
                        {isLoginView
                            ? "Experience the power of intelligent agents handling your outreach, scheduling, and client success."
                            : "Create an account today and start deploying AI agents to scale your business operations instantly."
                        }
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div className="flex text-yellow-400 mb-2">★★★★★</div>
                        <p className="italic text-indigo-100 mb-4">"This platform has completely revolutionized how we handle inbound leads. It's like adding 10 people to the sales team overnight."</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3"></div>
                            <div>
                                <p className="font-bold text-sm">Alex Rivera</p>
                                <p className="text-xs text-indigo-300">Director of Sales, FinTech Co.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isLoginView ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLoginView ? "Enter your details to access your dashboard." : "Get started with your 14-day free trial."}
                        </p>
                    </div>

                    {isLoginView ? (
                        // Login Form
                        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                            <div className="text-sm">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                                            </div>
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            {loginError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{loginError}</div>}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loginLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loginLoading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Register Form
                        <form className="mt-8 space-y-4" onSubmit={handleRegisterSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input
                                    id="regEmail"
                                    type="email"
                                    required
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="name@company.com"
                                />
                            </div>


                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                                <input
                                    id="companyName"
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Your Company Inc."
                                />
                            </div>

                            <div>
                                <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    id="regPassword"
                                    type="password"
                                    required
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${regPassword && confirmPassword && regPassword !== confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="••••••••"
                                />
                            </div>

                            {regError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{regError}</div>}

                            <div>
                                <button
                                    type="submit"
                                    disabled={regLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {regLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button onClick={toggleView} className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                {isLoginView ? "Sign up for free" : "Log in"}
                            </button>
                        </p>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <p className="text-xs text-center text-gray-400">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
