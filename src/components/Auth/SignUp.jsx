import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, AtSign, Hash, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive list of all country codes
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
  { value: '+211', label: 'SS', fullName: 'South Sudan' },
  { value: '+212', label: 'MA', fullName: 'Morocco' },
  { value: '+213', label: 'DZ', fullName: 'Algeria' },
  { value: '+216', label: 'TN', fullName: 'Tunisia' },
  { value: '+218', label: 'LY', fullName: 'Libya' },
  { value: '+220', label: 'GM', fullName: 'Gambia' },
  { value: '+221', label: 'SN', fullName: 'Senegal' },
  { value: '+222', label: 'MR', fullName: 'Mauritania' },
  { value: '+223', label: 'ML', fullName: 'Mali' },
  { value: '+224', label: 'GN', fullName: 'Guinea' },
  { value: '+225', label: 'CI', fullName: "Côte d'Ivoire" },
  { value: '+226', label: 'BF', fullName: 'Burkina Faso' },
  { value: '+227', label: 'NE', fullName: 'Niger' },
  { value: '+228', label: 'TG', fullName: 'Togo' },
  { value: '+229', label: 'BJ', fullName: 'Benin' },
  { value: '+230', label: 'MU', fullName: 'Mauritius' },
  { value: '+231', label: 'LR', fullName: 'Liberia' },
  { value: '+232', label: 'SL', fullName: 'Sierra Leone' },
  { value: '+233', label: 'GH', fullName: 'Ghana' },
  { value: '+234', label: 'NG', fullName: 'Nigeria' },
  { value: '+235', label: 'TD', fullName: 'Chad' },
  { value: '+236', label: 'CF', fullName: 'Central African Republic' },
  { value: '+237', label: 'CM', fullName: 'Cameroon' },
  { value: '+238', label: 'CV', fullName: 'Cape Verde' },
  { value: '+239', label: 'ST', fullName: 'São Tomé and Príncipe' },
  { value: '+240', label: 'GQ', fullName: 'Equatorial Guinea' },
  { value: '+241', label: 'GA', fullName: 'Gabon' },
  { value: '+242', label: 'CG', fullName: 'Congo' },
  { value: '+243', label: 'CD', fullName: 'DR Congo' },
  { value: '+244', label: 'AO', fullName: 'Angola' },
  { value: '+245', label: 'GW', fullName: 'Guinea-Bissau' },
  { value: '+246', label: 'IO', fullName: 'British Indian Ocean Territory' },
  { value: '+248', label: 'SC', fullName: 'Seychelles' },
  { value: '+249', label: 'SD', fullName: 'Sudan' },
  { value: '+250', label: 'RW', fullName: 'Rwanda' },
  { value: '+251', label: 'ET', fullName: 'Ethiopia' },
  { value: '+252', label: 'SO', fullName: 'Somalia' },
  { value: '+253', label: 'DJ', fullName: 'Djibouti' },
  { value: '+254', label: 'KE', fullName: 'Kenya' },
  { value: '+255', label: 'TZ', fullName: 'Tanzania' },
  { value: '+256', label: 'UG', fullName: 'Uganda' },
  { value: '+257', label: 'BI', fullName: 'Burundi' },
  { value: '+258', label: 'MZ', fullName: 'Mozambique' },
  { value: '+260', label: 'ZM', fullName: 'Zambia' },
  { value: '+261', label: 'MG', fullName: 'Madagascar' },
  { value: '+262', label: 'RE', fullName: 'Réunion' },
  { value: '+263', label: 'ZW', fullName: 'Zimbabwe' },
  { value: '+264', label: 'NA', fullName: 'Namibia' },
  { value: '+265', label: 'MW', fullName: 'Malawi' },
  { value: '+266', label: 'LS', fullName: 'Lesotho' },
  { value: '+267', label: 'BW', fullName: 'Botswana' },
  { value: '+268', label: 'SZ', fullName: 'Eswatini' },
  { value: '+269', label: 'KM', fullName: 'Comoros' },
  { value: '+290', label: 'SH', fullName: 'Saint Helena' },
  { value: '+291', label: 'ER', fullName: 'Eritrea' },
  { value: '+297', label: 'AW', fullName: 'Aruba' },
  { value: '+298', label: 'FO', fullName: 'Faroe Islands' },
  { value: '+299', label: 'GL', fullName: 'Greenland' },
  { value: '+350', label: 'GI', fullName: 'Gibraltar' },
  { value: '+351', label: 'PT', fullName: 'Portugal' },
  { value: '+352', label: 'LU', fullName: 'Luxembourg' },
  { value: '+353', label: 'IE', fullName: 'Ireland' },
  { value: '+354', label: 'IS', fullName: 'Iceland' },
  { value: '+355', label: 'AL', fullName: 'Albania' },
  { value: '+356', label: 'MT', fullName: 'Malta' },
  { value: '+357', label: 'CY', fullName: 'Cyprus' },
  { value: '+358', label: 'FI', fullName: 'Finland' },
  { value: '+359', label: 'BG', fullName: 'Bulgaria' },
  { value: '+370', label: 'LT', fullName: 'Lithuania' },
  { value: '+371', label: 'LV', fullName: 'Latvia' },
  { value: '+372', label: 'EE', fullName: 'Estonia' },
  { value: '+373', label: 'MD', fullName: 'Moldova' },
  { value: '+374', label: 'AM', fullName: 'Armenia' },
  { value: '+375', label: 'BY', fullName: 'Belarus' },
  { value: '+376', label: 'AD', fullName: 'Andorra' },
  { value: '+377', label: 'MC', fullName: 'Monaco' },
  { value: '+378', label: 'SM', fullName: 'San Marino' },
  { value: '+379', label: 'VA', fullName: 'Vatican City' },
  { value: '+380', label: 'UA', fullName: 'Ukraine' },
  { value: '+381', label: 'RS', fullName: 'Serbia' },
  { value: '+382', label: 'ME', fullName: 'Montenegro' },
  { value: '+383', label: 'XK', fullName: 'Kosovo' },
  { value: '+385', label: 'HR', fullName: 'Croatia' },
  { value: '+386', label: 'SI', fullName: 'Slovenia' },
  { value: '+387', label: 'BA', fullName: 'Bosnia and Herzegovina' },
  { value: '+389', label: 'MK', fullName: 'North Macedonia' },
  { value: '+420', label: 'CZ', fullName: 'Czech Republic' },
  { value: '+421', label: 'SK', fullName: 'Slovakia' },
  { value: '+423', label: 'LI', fullName: 'Liechtenstein' },
  { value: '+500', label: 'FK', fullName: 'Falkland Islands' },
  { value: '+501', label: 'BZ', fullName: 'Belize' },
  { value: '+502', label: 'GT', fullName: 'Guatemala' },
  { value: '+503', label: 'SV', fullName: 'El Salvador' },
  { value: '+504', label: 'HN', fullName: 'Honduras' },
  { value: '+505', label: 'NI', fullName: 'Nicaragua' },
  { value: '+506', label: 'CR', fullName: 'Costa Rica' },
  { value: '+507', label: 'PA', fullName: 'Panama' },
  { value: '+508', label: 'PM', fullName: 'Saint Pierre and Miquelon' },
  { value: '+509', label: 'HT', fullName: 'Haiti' },
  { value: '+590', label: 'GP', fullName: 'Guadeloupe' },
  { value: '+591', label: 'BO', fullName: 'Bolivia' },
  { value: '+592', label: 'GY', fullName: 'Guyana' },
  { value: '+593', label: 'EC', fullName: 'Ecuador' },
  { value: '+594', label: 'GF', fullName: 'French Guiana' },
  { value: '+595', label: 'PY', fullName: 'Paraguay' },
  { value: '+596', label: 'MQ', fullName: 'Martinique' },
  { value: '+597', label: 'SR', fullName: 'Suriname' },
  { value: '+598', label: 'UY', fullName: 'Uruguay' },
  { value: '+599', label: 'CW', fullName: 'Curaçao' },
  { value: '+670', label: 'TL', fullName: 'Timor-Leste' },
  { value: '+672', label: 'NF', fullName: 'Norfolk Island' },
  { value: '+673', label: 'BN', fullName: 'Brunei' },
  { value: '+674', label: 'NR', fullName: 'Nauru' },
  { value: '+675', label: 'PG', fullName: 'Papua New Guinea' },
  { value: '+676', label: 'TO', fullName: 'Tonga' },
  { value: '+677', label: 'SB', fullName: 'Solomon Islands' },
  { value: '+678', label: 'VU', fullName: 'Vanuatu' },
  { value: '+679', label: 'FJ', fullName: 'Fiji' },
  { value: '+680', label: 'PW', fullName: 'Palau' },
  { value: '+681', label: 'WF', fullName: 'Wallis and Futuna' },
  { value: '+682', label: 'CK', fullName: 'Cook Islands' },
  { value: '+683', label: 'NU', fullName: 'Niue' },
  { value: '+685', label: 'WS', fullName: 'Samoa' },
  { value: '+686', label: 'KI', fullName: 'Kiribati' },
  { value: '+687', label: 'NC', fullName: 'New Caledonia' },
  { value: '+688', label: 'TV', fullName: 'Tuvalu' },
  { value: '+689', label: 'PF', fullName: 'French Polynesia' },
  { value: '+690', label: 'TK', fullName: 'Tokelau' },
  { value: '+691', label: 'FM', fullName: 'Micronesia' },
  { value: '+692', label: 'MH', fullName: 'Marshall Islands' },
  { value: '+850', label: 'KP', fullName: 'North Korea' },
  { value: '+852', label: 'HK', fullName: 'Hong Kong' },
  { value: '+853', label: 'MO', fullName: 'Macau' },
  { value: '+855', label: 'KH', fullName: 'Cambodia' },
  { value: '+856', label: 'LA', fullName: 'Laos' },
  { value: '+880', label: 'BD', fullName: 'Bangladesh' },
  { value: '+886', label: 'TW', fullName: 'Taiwan' },
  { value: '+960', label: 'MV', fullName: 'Maldives' },
  { value: '+961', label: 'LB', fullName: 'Lebanon' },
  { value: '+962', label: 'JO', fullName: 'Jordan' },
  { value: '+963', label: 'SY', fullName: 'Syria' },
  { value: '+964', label: 'IQ', fullName: 'Iraq' },
  { value: '+965', label: 'KW', fullName: 'Kuwait' },
  { value: '+966', label: 'SA', fullName: 'Saudi Arabia' },
  { value: '+967', label: 'YE', fullName: 'Yemen' },
  { value: '+968', label: 'OM', fullName: 'Oman' },
  { value: '+970', label: 'PS', fullName: 'Palestine' },
  { value: '+971', label: 'AE', fullName: 'United Arab Emirates' },
  { value: '+972', label: 'IL', fullName: 'Israel' },
  { value: '+973', label: 'BH', fullName: 'Bahrain' },
  { value: '+974', label: 'QA', fullName: 'Qatar' },
  { value: '+975', label: 'BT', fullName: 'Bhutan' },
  { value: '+976', label: 'MN', fullName: 'Mongolia' },
  { value: '+977', label: 'NP', fullName: 'Nepal' },
  { value: '+992', label: 'TJ', fullName: 'Tajikistan' },
  { value: '+993', label: 'TM', fullName: 'Turkmenistan' },
  { value: '+994', label: 'AZ', fullName: 'Azerbaijan' },
  { value: '+995', label: 'GE', fullName: 'Georgia' },
  { value: '+996', label: 'KG', fullName: 'Kyrgyzstan' },
  { value: '+998', label: 'UZ', fullName: 'Uzbekistan' },
].sort((a, b) => a.fullName.localeCompare(b.fullName)); // Sort alphabetically by full name

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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
              className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 border-1 border-[#DCDCDC] focus:outline-none focus:ring-1 focus:ring-[#FF8126] transition-all"
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
                <div className="absolute z-10 w-64 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-2 py-2 border-b border-gray-200 focus:outline-none sticky top-0 bg-white text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((option) => (
                      <div
                        key={option.value}
                        className="px-2 py-1 text-gray-700 hover:text-white hover:bg-[#FF8126] cursor-pointer transition-colors duration-150 text-sm flex justify-between items-center"
                        onClick={() => handleCountryCodeChange(option.value)}
                      >
                        <span>{option.fullName}</span>
                        <span className="text-xs">{option.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-gray-500 text-sm">
                      No countries found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative w-3/4">
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="off"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Phone number"
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