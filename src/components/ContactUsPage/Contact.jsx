import React, { useState } from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";



function Contact() {

    const { language } = useLanguage();
    const t = translations[language];


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 md:py-16">
      <div className="w-full max-w-2xl">
        <h1 className="font-700 leading-[122%] lg:text-[57px] font-bold md:text-[50px] text-[25px] lg:text-center md:text-center text-left mb-5">
          {t.contacttitle}
        </h1>
        
        <p className="lg:text-center md:text-center text-left  text-[#8A8A8A] lg:text-[15px] md:text-[15px] text-[10px] leading-[166%] font-400 mb-10">
          {t.contactdes}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contactnameheading} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              autoComplete='off'
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition"
              placeholder={t.nameplaceholder}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contactemailheading} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                autoComplete='off'
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition"
                placeholder={t.emailplaceholder}
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contactNumberheading}
              </label>
              <input
                type="tel"
                autoComplete='off'
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition"
                placeholder={t.numberplaceholder}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contactmessageheading} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FF8126] focus:border-transparent transition resize-none"
              placeholder={t.messageplaceholder}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF8126] text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-200 ease-in-out font-medium"
          >
            {t.contactsubmitbutton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;