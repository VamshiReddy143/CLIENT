import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AtSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAuthStore from '../../store/authSlice';
import emailjs from '@emailjs/browser';

// Define validation schema for login
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

// Define validation schema for forgot password
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginUser, forgotPassword, loading } = useAuthStore();
  const navigate = useNavigate();

  // Initialize EmailJS with the new Public Key
  useEffect(() => {
    emailjs.init( import.meta.env.VITE_EMAILJS_PUBLIC_KEY_FOR_LOGIN); // Your EmailJS Public Key
  }, []);

  // Form for login
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

  // Form for forgot password
  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
    reset: resetForgot,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
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
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  const onForgotPasswordSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log('Submitting forgot password form with email:', data.email);
      if (!data.email) {
        throw new Error('data.email is empty or undefined');
      }
      const { resetToken, userId } = await forgotPassword(data.email);
      console.log('Received reset token:', resetToken, 'User ID:', userId);

      const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&userId=${userId}`;
      console.log('Generated reset link:', resetLink);

      const emailParams = {
        to_email: data.email,
        email: data.email,
        to: data.email,
        link: resetLink,
        from_email:import.meta.env.VITE_OWNER_EMAIL_FOR_LOGIN, // Replace with your verified email
      };

      console.log('EmailJS params:', emailParams);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID_FOR_LOGIN, // Your Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_LOGIN, // Your Template ID
        emailParams
      );

      console.log('EmailJS send response:', response);

      toast.success('Password reset link sent (check EmailJS logs for status)!');
      setIsDialogOpen(false);
      resetForgot();
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
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
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="block text-sm text-center text-[#EA7A39] hover:text-orange-500 mt-10 w-full"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email address to receive a password reset link.
            </p>
            <form onSubmit={handleForgotSubmit(onForgotPasswordSubmit)} className="space-y-6">
              <div className="relative">
                <input
                  {...registerForgot('email')}
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  className={`w-full px-4 py-3 bg-gray-100 rounded-lg pr-10 border-1 ${
                    forgotErrors.email ? 'border-red-500' : 'border-[#DCDCDC]'
                  } focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all`}
                />
                <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                {forgotErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{forgotErrors.email.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForgot();
                  }}
                  className="w-full py-3 px-6 rounded-full text-gray-600 font-medium border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full py-3 px-6 rounded-full text-white font-medium transition duration-200 ease-in-out ${
                    loading || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EA7A39] hover:bg-orange-500'
                  }`}
                >
                  {loading || isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;