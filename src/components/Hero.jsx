import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from "framer-motion";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 7px 20px rgba(255,129,38,0.3)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="min-h-[50vh] md:min-h-[500px] flex flex-col md:flex-row justify-between items-center py-10 md:py-0 px-4 md:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="md:w-[70%] w-[375px]">
        <motion.h1
          className="font-bold md:text-[50px] text-[38px] md:w-[800px] w-full"
          variants={textVariants}
        >
          {t.heroTitlePart1}
          <motion.span
            className={`text-[#FF8126] ${language === "en" ? "md:mr-[7em] ml-2" : ""} ${language === "fr" ? "md:mr-[4px] ml-[4px]" : ""}`}
            variants={textVariants}
          >
            {t.heroTitlePart2}
          </motion.span>
          {t.heroTitlePart3}
        </motion.h1>

        <motion.p
          className={`text-[16px] text-gray-600 ${language === "en" ? "md:w-[550px]" : "md:w-[700px]"} w-full mt-4`}
          variants={textVariants}
        >
          {t.heroDescription}
        </motion.p>

        <div className="md:flex justify-evenly md:gap-2 py-10 md:py-0 items-center mt-3 md:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] md:p-2 rounded-[26px] md:w-[750px] md:h-[104px] w-[372px] h-[295px]">
          {[
            { title: t.location, placeholder: t.locationPlaceholder },
            { title: t.priceRange, placeholder: t.priceRangePlaceholder },
            { title: t.spaceSize, placeholder: t.spaceSizePlaceholder, icon: "/calender.png" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-[14px] md:w-[220px] border-gray-600 border-[1px] px-3 py-1 ${index > 0 ? "md:mt-0 mt-2" : ""} ${item.icon ? "flex justify-between gap-3 items-center" : ""}`}
              variants={inputVariants}
              whileHover="hover"
            >
              <div>
                <h2 className="font-medium text-[18px]">{item.title}</h2>
                <h2 className="text-gray-400">{item.placeholder}</h2>
              </div>
              {item.icon && <img src={item.icon} alt="Calendar" />}
            </motion.div>
          ))}
          <motion.div
            variants={inputVariants}
            whileHover="hover"
          >
            <motion.button
              className="bg-[#FF8126] text-white rounded-[14px] py-[19px] px-[17px] gap-[10px] shadow-md w-full md:mt-0 mt-3"
              variants={buttonVariants}
              whileHover="hover"
            >
              {t.search}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-[360px] h-[360px] mt-10 md:mt-0"
        variants={imageVariants}
      >
        <motion.img
          src="/hero.png"
          alt="Hero"
          className="w-[381px] h-[381px] object-cover"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;