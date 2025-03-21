import React from 'react';
import { motion } from 'framer-motion'; 
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

const Offer = () => {

     const { language } = useLanguage();
     const t = translations[language];



  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.2 }, // Staggered effect
    }),
  };

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut', delay: 0.5 },
    },
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:pl-12 lg:pr-0 py-10 sm:py-12 md:py-16 lg:py-[10em] flex flex-col lg:flex-row items-center lg:gap-10 justify-between max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:w-[650px] gap-12">
          {/* Animated Title */}
          <motion.h1
            className="font-bold text-[32px] sm:text-[40px] lg:text-[47px] leading-tight text-[#1A1A1A]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Triggers when 30% of element is in view
            variants={titleVariants}
          >
           {t. OfferTitle}
          </motion.h1>

          {/* Animated List Items */}
          <div className="flex flex-col gap-9">
            {[
              {
                number: '01',
                title: `${t.OfferCard1Title}`,
                description:
                  `${t.OfferCard1Description}`,
              },
              {
                number: '02',
                title: `${t.OfferCard2Title}`,
                description:
                  `${t.OfferCard2Description}`,
              },
              {
                number: '03',
                title: `${t.OfferCard3Title}`,
                description:
                  `${t.OfferCard3Description}`,
              },
              {
                number: '04',
                title: `${t.OfferCard4Title}`,
                description:
                  `${t.OfferCard4Description}`,
              },
              {
                number: '05',
                title: `${t.OfferCard5Title}`,
                description:
                  `${t.OfferCard5Description}`,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                custom={index} // Pass index for staggered delay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of element is in view
                variants={listItemVariants}
              >
                <span className="text-[#FC572E] font-bold text-[32px] min-w-[40px]">
                  {item.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold lg:text-2xl text-lg  text-[#1A1A1A] leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-[#646A69] text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Image */}
        <motion.div
          className="w-full hidden lg:block md:block lg:w-[650px] lg:mt-15 mt-12 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} 
          variants={imageVariants}
        >
          <img
            src="/shopopen.svg"
            alt="Shop illustration"
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Offer;