// src/pages/Auth/Login.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log('Login API response:', response.data);

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data); // ✅ Correct usage

        navigate('/dashboard');
      } else {
        setError('Login failed: no token returned');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center min-w-[300px]">
      <h2 className="text-lg font-semibold text-black">Welcome Back</h2>
      <p className="text-xl text-slate-700 mt-[5px] mb-6">
        Please enter your details to login
      </p>

      <form onSubmit={handleLogin}>
        <label className="text-sm text-black font-medium mb-1">Email Address</label>
        <input
          className="w-full border rounded-md px-3 py-2 mb-4"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="bob@example.com"
          type="email"
        />

        <label className="text-sm text-black font-medium mb-1">Password</label>
        <input
          className="w-full border rounded-md px-3 py-2 mb-4"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Log In
        </button>

        <p className="text-[18px] text-slate-800 mt-3">
          Don't have an account?{' '}
          <button
            type="button"
            className="font-medium text-indigo-600 underline cursor-pointer"
            onClick={() => setCurrentPage('signup')}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
