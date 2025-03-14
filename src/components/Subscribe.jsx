import React from 'react';

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

function App() {

     const { language } = useLanguage();
        const t = translations[language];
  return (
    <div className="flex flex-col md:h-[588px] relative items-center text-center mb-2 py-10 bg-[#FFF2E1] ">
      <h1 className="md:w-[821px] w-[329px] top-[60px] left-[50px]  font-bold font-700 text-[32px] md:text-[57px] py-10">
        {t.subtitle}
      </h1>
      <p className="md:w-[536px] w-[258px] font-400 text-[14px]   md:text-[18px]">
        {t.subdes}
      </p>

      <div className="relative md:mt-[2em] mt-2 mb-[10em]">
        <input
          type="text"
          placeholder={t.subph}
          className="md:w-[675px] md:h-[57px] w-[375px] h-[57px] bg-white rounded-[10px] px-5 shadow-2xl"
        />
        <button className="absolute bg-[#FF8126] text-white top-[7px] right-[2px] rounded-[8px] md:w-[129px] md:h-[42px] h-[35px] w-[109px]">
          {t.signUp}
        </button>
      </div>

      <div className="absolute md:left-0 md:bottom-0 md:w-[250px] md:h-[300px] w-[180.47px] h-[200.94] top-[288px] bottom-0 left-0 mt-14 md:mt-0 " >
        <img
          src="/hut.png"
          alt="Marketplace stand"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute md:right-0 md:bottom-0 md:w-[350px] md:h-[250px] w-[171.19px] h-[126px] bottom-0 right-0">
        <img
          src="/about.png"
          alt="Business growth"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default App;