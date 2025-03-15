import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25), 0px -2px 8px rgba(255, 255, 255, 0.2)",
  },
  hover: {
    scale: 1.03,
    y: -3,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3), 0px -3px 10px rgba(255, 255, 255, 0.25)",
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.97,
    y: 4,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15), 0px -1px 4px rgba(255, 255, 255, 0.1)",
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

function App() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full min-h-[501px] h-auto md:h-[588px] relative flex flex-col items-center text-center py-8 sm:py-10 md:py-12 lg:py-14 bg-[#FFF2E1] overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[821px] px-4">
        {/* Title */}
        <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[57px] max-w-[90%] sm:max-w-[400px] md:max-w-[821px] mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-5 leading-tight">
          {t.subtitle}
        </h1>

        {/* Description */}
        <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] max-w-[90%] sm:max-w-[300px] md:max-w-[536px] text-gray-600 mb-8 sm:mb-10">
          {t.subdes}
        </p>

        {/* Input and Button */}
        <div className="relative w-full md:mt-[5em] max-w-[360px] sm:max-w-[700px] md:w-[600px] md:h-[57px] h-[48px] sm:h-[57px] mx-auto">
          <input
            type="text"
            placeholder={t.subph}
            className="w-full h-full bg-white  focus:outline-gray-200 rounded-[10px] px-3 shadow-2xl md:scale-100"
          />
          <motion.button
            className="absolute top-1 sm:top-2 right-1 bg-[#FF8126] text-white rounded-[8px] w-[100px] sm:w-[109px] md:w-[129px] h-[40px] md:h-[42px] flex items-center justify-center md:scale-100"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
            }}
          >
            {t.signUp}
          </motion.button>
        </div>
      </div>

      {/* Images Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Image */}
        <div className="absolute bottom-0 left-0 w-[203.47px] max-w-[379px] h-[212.47px] max-h-[400px] sm:w-[25vw] sm:h-[25vw] sm:max-w-[300px] sm:max-h-[350px] md:w-[20vw] md:h-[20vw] md:max-w-[300px] md:max-h-[350px] lg:w-[300px] lg:h-[400px] lg:max-w-[299px] lg:max-h-[370px] md:scale-100">
          <img
            src="/hut.svg"
            alt="Marketplace stand"
            className="w-full h-full md:object-contain"
          />
        </div>

        {/* Right Image */}
        <div className="absolute bottom-0 right-0 w-[171.19px] max-w-[399px] h-[126px] max-h-[294px] sm:w-[25vw] sm:h-[15vw] sm:max-w-[300px] sm:max-h-[220px] md:w-[20vw] md:h-[12vw] md:max-w-[300px] md:max-h-[220px] lg:w-[399px] lg:h-[294px] lg:max-w-[366px] lg:max-h-[254px] md:scale-100">
          <img
            src="/about11.svg"
            alt="Business growth"
            className="w-full h-full object-contain md:object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default App;