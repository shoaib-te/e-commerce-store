import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../api_url';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log({ email, password });
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/admin`, {
                email,
                password
            });
            if (response.data.success) {
                setToken(response.data.token);
                toast.success('Login successful');
                navigate('/orders');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-gray-100'>
                <h1 className='text-2xl font-bold mb-4 text-gray-800'>Admin Panel</h1>
                
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-1 focus:ring-black' 
                            type="email" 
                            placeholder='your@email.com' 
                            required 
                        />
                    </div>

                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-1 focus:ring-black' 
                            type="password" 
                            placeholder='Enter your password' 
                            required 
                        />
                    </div>

                    <button 
                        type='submit' 
                        className='mt-4 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors active:scale-95 font-medium'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
