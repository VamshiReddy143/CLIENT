import React, { useState } from 'react';
import { Eye, EyeOff, AtSign, Hash, ChevronDown } from 'lucide-react';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: '' // Changed from 'vendor' to '' for no default selection
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const userTypes = [
    { value: 'vendor', label: 'Vendor' },
    { value: 'market_owner', label: 'Market owner' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl lg:text-[40px] font-bold text-center text-gray-900 mb-8">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              autoComplete='off'
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126]  transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              autoComplete='off'
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126]  transition-all"
              required
            />
            <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              autoComplete='off'
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all"
              required
            />
            <Hash className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              autoComplete='off'
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126]  transition-all"
              required
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

          <div className="relative">
            <div className="relative">
              <div 
                className="w-full px-4 py-3 bg-gray-100 rounded-md cursor-pointer border-1 border-[#DCDCDC] flex justify-between items-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500  transition-all"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={formData.userType ? "text-gray-700" : "text-gray-400"}>
                  {formData.userType 
                    ? userTypes.find(type => type.value === formData.userType)?.label 
                    : "Want to sign up as"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 ">
                  {userTypes.map((type) => (
                    <div
                      key={type.value}
                      className="px-4 py-2 text-gray-700 hover:text-white hover:bg-[#FF8126] cursor-pointer transition-colors duration-150"
                      onClick={() => handleUserTypeChange(type.value)}
                    >
                      {type.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8126] text-white py-3 px-6 rounded-full hover:bg-orange-500 transition duration-200 ease-in-out font-medium"
          >
            Sign Up
          </button>

          <p className="text-left text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#FF8126] hover:text-orange-600 font-medium">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;