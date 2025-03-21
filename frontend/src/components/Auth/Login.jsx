// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, AtSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAuthStore from '../../store/authSlice'; 

// Define validation schema using zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must not exceed 50 characters'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { user } = await loginUser({
        email: data.email,
        password: data.password,
      });
      toast.success('Logged in successfully!');
      switch (user.user_role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'vendor':
          navigate('/vendor');
          break;
        case 'market_owner':
          navigate('/market-owner');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center lg:text-[40px] text-gray-900 mb-8">
          Log In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              autoComplete="off"
              placeholder="Email"
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg pr-10 border-1 ${
                errors.email ? 'border-red-500' : 'border-[#DCDCDC]'
              } focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all`}
            />
            <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg pr-10 border-1 ${
                errors.password ? 'border-red-500' : 'border-[#DCDCDC]'
              } focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-full text-white font-medium transition duration-200 ease-in-out ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EA7A39] hover:bg-orange-500'
            }`}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          <div className="text-left space-y-2">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#EA7A39] hover:text-orange-500 font-medium">
                Register
              </Link>
            </p>
            <Link
              to="#"
              className="block text-sm text-center text-[#EA7A39] hover:text-orange-500 mt-10"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;