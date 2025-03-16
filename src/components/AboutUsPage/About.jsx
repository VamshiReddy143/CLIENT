import React from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { motion } from "framer-motion"; 
const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } }, 
  };

  return (
    <div className="w-full md:w-full lg:max-w-[1440px] lg:mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-1 py-10 sm:py-12 md:py-16 lg:py-[5em] flex flex-col lg:flex-row md:flex-col gap-6 sm:gap-8 md:gap-[4em] items-center">
      
      <motion.div
        className="w-full md:w-full lg:w-[60%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        <motion.h1
          className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[57px] mb-4 sm:mb-6 md:mb-5 leading-tight"
          whileHover={{ x: 10 }} 
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600"
          variants={textVariants}
          transition={{ delay: 0.2 }} 
        >
          {t.paragraph1}
        </motion.p>
        <motion.p
          className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600 mt-4 sm:mt-6 md:mt-7"
          variants={textVariants}
          transition={{ delay: 0.4 }} 
        >
          {t.paragraph2}
        </motion.p>
      </motion.div>

 
      <motion.div
        className="w-full lg:w-[40%] md:flex justify-center"
        initial="hidden"
        whileInView="visible"
        whileHover="hover" 
        viewport={{ once: true }}
        variants={imageVariants}
      >
        <img
          src="/about11.svg"
          alt="about"
          className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[450px] h-auto"
        />
      </motion.div>
    </div>
  );
};

export default About;