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
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25), 0px -2px 8px rgba(255, 255, 255, 0.2)",
    },
    hover: {
      scale: 1.03,
      y: -3,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3), 0px -3px 10px rgba(255, 255, 255, 0.25)",
      transition: { duration: 0.15, ease: "easeOut" },
    },
    tap: {
      scale: 0.97,
      y: 4,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15), 0px -1px 4px rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  }

const SpaceHero = () => {
    const { language } = useLanguage();
    const t = translations[language];
    
    return (
        <div className="relative bg-[url('/spacebg.png')] bg-cover bg-center ">
            <div className="absolute inset-0 bg-white opacity-80 z-10"></div>
            
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
                <h1 className="z-30 md:w-[776px] w-[375px] text-[38px] leading-[48px]  font-700 md:text-[57px] text-center font-bold md:leading-[79px]"><span className='block'>{t.spacepageherotitle1}</span>{t.spacepageherotitle2}</h1>
           <div className="flex flex-col px-5 md:flex-row md:items-center md:justify-between gap-4 md:gap-2 mt-6 md:mt-7 w-full md:w-[825px] md:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] md:rounded-[26px] md:p-3">
                   {[
                     { title: t.location, placeholder: t.locationPlaceholder },
                     { title: t.priceRange, placeholder: t.priceRangePlaceholder },
                     { title: t.spaceSize, placeholder: t.spaceSizePlaceholder, icon: "/cal.svg" },
                   ].map((item, index) => (
                     <motion.div
                       key={index}
                       className={`rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full md:w-[825px] lg:w-[825px] ${item.icon ? "flex justify-between items-center gap-2" : ""}`}
                       variants={inputVariants}
                       whileHover="hover"
                     >
                       <div>
                         <h2 className="font-medium text-[16px] sm:text-[17px] md:text-[18px] font-sans">
                           {item.title}
                         </h2>
                         <h2 className="text-gray-400 text-[14px] font-sans truncate">
                           {item.placeholder}
                         </h2>
                       </div>
                       {item.icon && (
                         <img src={item.icon} alt="Calendar" className="w-5 h-5" />
                       )}
                     </motion.div>
                   ))}
                   <motion.div variants={inputVariants} whileHover="hover">
                     <motion.button
                       className="bg-[#FF8126] text-white px-4 py-3 md:py-[18px] rounded-xl shadow-2xl w-full md:w-[110px] lg:w-[110px] flex items-center justify-center"
                       variants={buttonVariants}
                       initial="initial"
                       whileHover="hover"
                       whileTap="tap"
                       style={{
                         borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                         borderBottom: "5px solid rgba(0, 0, 0, 0.2)",
                         position: "relative",
                       }}
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