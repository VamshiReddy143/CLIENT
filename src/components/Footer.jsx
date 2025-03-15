import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from "framer-motion";

const Footer = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      x: 10,
      color: "#f97316", // orange-500
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="bg-black text-[#FFFFFF] p-4 sm:p-6 md:p-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div variants={itemVariants} className="mb-8 md:mb-0">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-[30px] lg:text-[30px]">
            {t.brand.split(" ")[0]}{" "}
            <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
          </h1>
          <p className="font-normal text-sm sm:text-base md:text-[15px] lg:text-[15px] mt-3 sm:mt-4 md:mt-5 max-w-xs sm:max-w-sm md:max-w-[484px] lg:max-w-[484px]">
            {t.footerdes}
          </p>
          <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-5">
            {["insta.svg", "fb.svg", "in.svg"].map((src, index) => (
              <motion.img
                key={index}
                src={`/${src}`}
                alt={src.split(".")[0]}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-[36px] md:h-[36px] cursor-pointer"
                variants={socialIconVariants}
                whileHover="hover"
              />
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-start mt-6 sm:mt-8 md:mt-0">
          <motion.div variants={itemVariants} className="mb-6 md:mb-0">
            <h2 className="font-bold text-xl sm:text-2xl md:text-[24px] lg:text-[24px] mb-3 sm:mb-4 md:mb-5">
              {t.footerlinktitle}
            </h2>
            <ul className="cursor-pointer">
              {[t.footerlinkhome, t.footerlinkabout, t.footerlinklistings, t.footerlistingblogs, t.footerlistingcontactus].map((link, index) => (
                <motion.li
                  key={index}
                  className="text-base sm:text-lg md:text-[18px] lg:text-[18px] font-normal mb-2"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="font-bold text-xl sm:text-2xl md:text-[24px] lg:text-[24px] mb-3 sm:mb-4 md:mb-5">
              {t.footerlistingcontactus}
            </h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              {[
                { src: "location.svg", text: t.footercontactmap },
                { src: "phone.svg", text: "+12 345 6789" },
                { src: "mail.svg", text: "support@marketplaceplatform.com" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-2 sm:gap-3 items-center"
                  variants={itemVariants}
                >
                  <img
                    src={`/${item.src}`}
                    alt={item.src.split(".")[0]}
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-[38px] md:w-[38px]"
                  />
                  <p className="text-sm sm:text-base md:text-[18px] lg:text-[18px] max-w-xs sm:max-w-sm md:max-w-[283px] lg:max-w-[283px]">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 sm:mt-8 md:mt-10">
        <motion.div
          className="bg-white h-[1px] sm:h-[1.5px] md:h-[2px] w-full"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.p
          className="text-sm sm:text-base md:text-[18px] lg:text-[18px] font-normal text-center mt-3 sm:mt-4 md:mt-5 max-w-xs sm:max-w-sm md:max-w-[313px] lg:max-w-[313px]"
          variants={itemVariants}
        >
          {t.copyright}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Footer;