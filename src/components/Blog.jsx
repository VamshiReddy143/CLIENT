import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const Blog = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto  flex flex-col  sm:py-12 md:py-16 lg:py-[4em] px-4 sm:px-6  lg:px-12 xl:px-16">
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[57px] text-center leading-tight">
          {t.blogtitle}
        </h1>
        <p className="font-normal text-gray-500 text-[14px] sm:text-[16px] md:text-[18px] text-center max-w-[90%] sm:max-w-[400px] md:max-w-[536px]">
          {t.blogdes}
        </p>
      </motion.div>

      {/* Blog Content Section */}
      <div className="py-8 sm:py-10 lg:flex  justify-between gap-6 md:gap-8 lg:gap-10">
        {/* Main Blog Post */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <img 
            src="/blog1.jpg" 
            alt="blog" 
            className="w-full sm:w-full  max-w-[372px] sm:max-w-[450px] lg:max-w-[510px] md:max-w-full  h-[248px] sm:h-[300px] md:h-[340px] rounded-lg mb-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg object-cover"
          />
          <div className="flex flex-col-reverse md:flex-row md:gap-2 gap-4">
            <h1 className="font-normal text-[20px] sm:text-[22px] md:text-[26px] max-w-[90%] lg:max-w-[380px] md:max-w-full">
              {t.blog1title}
            </h1>
            <p className="font-light text-[14px] sm:text-[15px] mt-2 text-gray-500">
              {t.blogdate}
            </p>
          </div>
          <p className="font-normal text-[15px] sm:text-[16px] md:text-[16.4px] text-gray-500 mt-4 sm:mt-6 md:mt-7 max-w-[90%] lg:max-w-[500px]">
            {t.blog1des}
          </p>
        </motion.div>

        {/* Side Blog Posts */}
        <div className="flex flex-col  justify-between  md:w-[70%] lg:w-1/2 mt-8 md:mt-10 gap-6 sm:gap-8 md:gap-5">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="flex flex-row-reverse    gap-4 sm:gap-6 md:w-[100%] lg:max-w-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col lg:gap-3 ">
                <h1 className="font-normal leading-[132%] text-[10px] sm:text-[16px] md:text-[16px] max-w-[220px] sm:max-w-[260px] lg:max-w-[294px] md:max-w-[100%]">
                  {index === 1 
                    ? `${t.blog2title}`
                    : index === 2 
                    ? `${t.blog3title}`
                    : `${t.blog4title}`}
                </h1>
                <p className="font-normal text-[12px] sm:text-[12.4px] text-gray-500 max-w-[220px] sm:max-w-[260px] lg:max-w-[294px] md:max-w-[100%]">
                  {index === 1 
                    ? `${t.blog2des}`
                    : index === 2 
                    ? `${t.blog3des}`
                    : `${t.blog4des}`}
                </p>
                <p className="font-light text-[10px] sm:text-[11px] md:text-[12px] text-gray-500">
                  {t.blogdate}
                </p>
              </div>
              <img 
                src={`/blog${index + 1 }.jpg`} 
                alt="blog" 
                className="w-[175px] sm:w-[170px] lg:w-[198px] md:w-[280px] h-[99px] sm:h-[110px] md:h-[129px] rounded-[6px] transition-transform duration-300 hover:scale-105 hover:shadow-md object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;