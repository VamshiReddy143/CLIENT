import React from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { motion } from 'framer-motion'; 

const OurVision = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Animation variants for text section
  const textVariants = {
    hidden: { opacity: 0, x: 50 }, // Slide from right
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Animation variants for image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -50 }, // Slide from left
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.3 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } }, // Hover effect
  };

  return (
    <div className="w-full md:w-full lg:max-w-[1440px] lg:mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-1 py-10 sm:py-12 md:py-16 lg:py-[5em] flex flex-col lg:flex-row-reverse md:flex gap-6 sm:gap-8 md:gap-[4em] items-center">
      {/* Text Section with Animation */}
      <motion.div
        className="w-full md:w-full lg:w-[60%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Triggers when 30% in view
        variants={textVariants}
      >
        <motion.h1
          className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[57px] mb-4 sm:mb-6 md:mb-5 leading-tight"
          whileHover={{ x: -10 }} // Subtle slide left on hover
        >
          {t.visiontitle}
        </motion.h1>
        <motion.p
          className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600"
          variants={textVariants}
          transition={{ delay: 0.2 }} // Staggered animation
        >
          {t.visiondes1}
        </motion.p>
        <motion.p
          className="font-light text-[16px] sm:text-[17px] md:text-[18px] text-gray-600 mt-4 sm:mt-6 md:mt-7"
          variants={textVariants}
          transition={{ delay: 0.4 }} // Staggered animation
        >
          {t.visiondes2}
        </motion.p>
      </motion.div>

      {/* Image Section with Animation */}
      <motion.div
        className="w-full lg:w-[40%] md:flex justify-center"
        initial="hidden"
        whileInView="visible"
        whileHover="hover" // Hover effect
        viewport={{ once: true, amount: 0.3 }} // Triggers when 30% in view
        variants={imageVariants}
      >
        <img
          src="/honeyshop.svg"
          alt="about"
          className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[450px] h-auto"
        />
      </motion.div>
    </div>
  );
};

export default OurVision;