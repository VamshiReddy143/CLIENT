import React from 'react'
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from 'framer-motion';

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

const SpaceHero = () => {
    const { language } = useLanguage();
    const t = translations[language];
    
    return (
        <div className="relative bg-[url('/spacebg.png')] bg-cover bg-center ">
            <div className="absolute inset-0 bg-white opacity-80 z-10"></div>
            
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
                <h1 className="z-30 md:w-[776px] w-[375px] text-[38px] leading-[48px]  font-700 md:text-[57px] text-center font-bold md:leading-[79px]"><span className='block'>{t.spacepageherotitle1}</span>{t.spacepageherotitle2}</h1>
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
        </div>
    )
}

export default SpaceHero