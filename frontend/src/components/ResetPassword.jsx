// src/components/Auth/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useAuthStore from '@/store/authSlice';


// Define validation schema for reset password
const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must not exceed 50 characters'),
  confirmPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must not exceed 50 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuthStore();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!token || !userId) {
      toast.error('Invalid reset link');
      navigate('/login');
    }
  }, [token, userId, navigate]);

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.newPassword);
      toast.success('Password reset successfully! Please log in with your new password.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
      console.error('Reset password error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center lg:text-[40px] text-gray-900 mb-8">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register('newPassword')}
              type="password"
              placeholder="New Password"
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-1 ${
                errors.newPassword ? 'border-red-500' : 'border-[#DCDCDC]'
              } focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm Password"
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-1 ${
                errors.confirmPassword ? 'border-red-500' : 'border-[#DCDCDC]'
              } focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-full text-white font-medium transition duration-200 ease-in-out ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EA7A39] hover:bg-orange-500'
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;