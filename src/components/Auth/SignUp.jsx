import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, AtSign, Hash, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive list of country codes with shortened names
const COUNTRY_OPTIONS = [
  { value: '+1', label: 'US', fullName: 'United States' },
  { value: '+7', label: 'RU', fullName: 'Russia' },
  { value: '+20', label: 'EG', fullName: 'Egypt' },
  { value: '+27', label: 'ZA', fullName: 'South Africa' },
  { value: '+30', label: 'GR', fullName: 'Greece' },
  { value: '+31', label: 'NL', fullName: 'Netherlands' },
  { value: '+32', label: 'BE', fullName: 'Belgium' },
  { value: '+33', label: 'FR', fullName: 'France' },
  { value: '+34', label: 'ES', fullName: 'Spain' },
  { value: '+36', label: 'HU', fullName: 'Hungary' },
  { value: '+39', label: 'IT', fullName: 'Italy' },
  { value: '+40', label: 'RO', fullName: 'Romania' },
  { value: '+41', label: 'CH', fullName: 'Switzerland' },
  { value: '+43', label: 'AT', fullName: 'Austria' },
  { value: '+44', label: 'GB', fullName: 'United Kingdom' },
  { value: '+45', label: 'DK', fullName: 'Denmark' },
  { value: '+46', label: 'SE', fullName: 'Sweden' },
  { value: '+47', label: 'NO', fullName: 'Norway' },
  { value: '+48', label: 'PL', fullName: 'Poland' },
  { value: '+49', label: 'DE', fullName: 'Germany' },
  { value: '+51', label: 'PE', fullName: 'Peru' },
  { value: '+52', label: 'MX', fullName: 'Mexico' },
  { value: '+53', label: 'CU', fullName: 'Cuba' },
  { value: '+54', label: 'AR', fullName: 'Argentina' },
  { value: '+55', label: 'BR', fullName: 'Brazil' },
  { value: '+56', label: 'CL', fullName: 'Chile' },
  { value: '+57', label: 'CO', fullName: 'Colombia' },
  { value: '+58', label: 'VE', fullName: 'Venezuela' },
  { value: '+60', label: 'MY', fullName: 'Malaysia' },
  { value: '+61', label: 'AU', fullName: 'Australia' },
  { value: '+62', label: 'ID', fullName: 'Indonesia' },
  { value: '+63', label: 'PH', fullName: 'Philippines' },
  { value: '+64', label: 'NZ', fullName: 'New Zealand' },
  { value: '+65', label: 'SG', fullName: 'Singapore' },
  { value: '+66', label: 'TH', fullName: 'Thailand' },
  { value: '+81', label: 'JP', fullName: 'Japan' },
  { value: '+82', label: 'KR', fullName: 'South Korea' },
  { value: '+84', label: 'VN', fullName: 'Vietnam' },
  { value: '+86', label: 'CN', fullName: 'China' },
  { value: '+90', label: 'TR', fullName: 'Turkey' },
  { value: '+91', label: 'IN', fullName: 'India' },
  { value: '+92', label: 'PK', fullName: 'Pakistan' },
  { value: '+93', label: 'AF', fullName: 'Afghanistan' },
  { value: '+94', label: 'LK', fullName: 'Sri Lanka' },
  { value: '+95', label: 'MM', fullName: 'Myanmar' },
  { value: '+98', label: 'IR', fullName: 'Iran' },
];

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '', // Just the digits
    password: '',
    userType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [countrySearch, setCountrySearch] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    const cleaned = value.replace(/[^\d]/g, '');
    setFormData(prev => ({
      ...prev,
      phoneNumber: cleaned
    }));
  };

  const handleCountryCodeChange = (code) => {
    setSelectedCountryCode(code);
    setIsCountryDropdownOpen(false);
    setCountrySearch('');
  };

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
    // Combine country code and phone number for submission
    console.log('Form submitted:', {
      ...formData,
      phone: `${selectedCountryCode}${formData.phoneNumber}`
    });
  };

  const filteredCountries = useMemo(() => {
    return COUNTRY_OPTIONS.filter(option =>
      option.fullName.toLowerCase().includes(countrySearch.toLowerCase()) ||
      option.value.includes(countrySearch) ||
      option.label.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

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
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all "
              
            />
          </div>

          <div className="relative">
            <input
              type="email"
              autoComplete="off"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all"
              
            />
            <AtSign className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
          </div>

          <div className="relative flex space-x-2">
            {/* Country Code Dropdown (Smaller) */}
            <div className="relative w-1/4">
              <div
                className="w-full px-2 py-3 bg-gray-100 rounded-md cursor-pointer border-1 border-[#DCDCDC] flex justify-between items-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              >
                <span className="text-gray-700">
                  {COUNTRY_OPTIONS.find(opt => opt.value === selectedCountryCode)?.value || selectedCountryCode}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {isCountryDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-2 py-1 border-b border-gray-200 focus:outline-none sticky top-0 bg-white text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {filteredCountries.map((option) => (
                    <div
                      key={option.value}
                      className="px-2 py-1 text-gray-700 hover:text-white hover:bg-[#FF8126] cursor-pointer transition-colors duration-150 text-sm"
                      onClick={() => handleCountryCodeChange(option.value)}
                    >
                      {`(${option.value}) ${option.label}`}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number  */}
            <div className="relative w-3/4">
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="off"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="phone number"
                className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all"
               
              />
              <Hash className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all"
             
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
                className="w-full px-4 py-3 bg-gray-100 rounded-md cursor-pointer border-1 border-[#DCDCDC] flex justify-between items-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
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
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200">
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
            <Link to="/login" className="text-[#FF8126] hover:text-orange-600 font-medium">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;