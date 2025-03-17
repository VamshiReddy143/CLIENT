import React from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-1 py-10 sm:py-12 md:py-16 lg:py-[5em] flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[4em] items-center">
      {/* Image Section */}
      <div className="w-full md:w-[40%] hidden md:flex justify-center">
        <img
          src="/about11.svg"
          alt="about"
          className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[450px] h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-[60%]">
        <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[57px] mb-4 sm:mb-6 md:mb-8 leading-tight">
          {t.title}
        </h1>
        <p className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600">
          {t.paragraph1}
        </p>
        <p className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600 mt-4 sm:mt-6 md:mt-7">
          {t.paragraph2}
        </p>
      </div>
    </div>
  );
};

export default About;