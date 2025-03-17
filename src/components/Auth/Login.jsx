import React, { useState } from 'react';
import { Eye, EyeOff, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';



function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center lg:text-[40px] text-gray-900 mb-8">
          Log In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              autoComplete='off'
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg pr-10 border-1 border-[#DCDCDC]  focus:outline-none focus:ring-1 focus:ring-[#EA7A39]  transition-all"
            
            />
            <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#EA7A39] transition-all"
            
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EA7A39] text-white py-3 px-6 rounded-full hover:bg-orange-500 transition duration-200 ease-in-out font-medium "
          >
            Log In
          </button>

          <div className="text-left space-y-2">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[#EA7A39] hover:text-orange-500 font-medium ">
                Register
              </Link>
            </p>
            <Link to="#" className="block text-sm text-center text-[#EA7A39] hover:text-orange-500 mt-10">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;