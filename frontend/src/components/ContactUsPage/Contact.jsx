import React, { useState } from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import toast, { Toaster } from "react-hot-toast";
import emailjs from 'emailjs-com';

function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error(t.contactNameRequired || "Please enter your name.", {
        style: {
          background: '#fef2f2', // Light red background
          color: '#dc2626', // Red text
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#dc2626', // Red icon
          secondary: '#fef2f2',
        },
      });
      return;
    }
    if (!formData.email.trim()) {
      toast.error(t.contactEmailRequired || "Please enter your email.", {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fef2f2',
        },
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t.contactEmailInvalid || "Please enter a valid email address.", {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fef2f2',
        },
      });
      return;
    }
    if (!formData.message.trim()) {
      toast.error(t.contactMessageRequired || "Please enter your message.", {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fef2f2',
        },
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      mobile: formData.mobile || 'Not provided',
      message: formData.message,
      to_email: import.meta.env.VITE_OWNER_EMAIL
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success(t.contactSuccess || "Your message has been sent successfully!", {
        style: {
          background: '#ecfdf5', // Light green background
          color: '#15803d', // Green text
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#15803d', // Green icon
          secondary: '#ecfdf5',
        },
      });

      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
    } catch (error) {
      toast.error(t.contactError || "Failed to send your message. Please try again.", {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '12px',
          padding: '12px 16px',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fef2f2',
        },
      });
      console.error("EmailJS error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 md:py-16">
      <Toaster position="top-right" />
      <div className="w-full max-w-2xl">
        <h1 className="font-700 leading-[122%] lg:text-[57px] font-bold md:text-[50px] text-[25px] lg:text-center md:text-center text-left mb-5">
          {t.contacttitle}
        </h1>
        
        <p className="lg:text-center md:text-center text-left text-[#8A8A8A] lg:text-[15px] md:text-[15px] text-[10px] leading-[166%] font-400 mb-10">
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
            disabled={loading}
            className={`w-full bg-[#FF8126] text-white py-3 px-6 rounded-md hover:bg-orange-500 transition duration-200 ease-in-out font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (t.contactSubmitting || "Submitting...") : t.contactsubmitbutton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;