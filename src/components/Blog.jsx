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
    <div className='min-h-screen flex flex-col w-full py-10 md:py-[4em] px-4 md:px-10'>
      <motion.div 
        className='flex flex-col items-center'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className='font-700 md:text-[57px] text-[32px] text-center'>{t.blogtitle}</h1>
        <p className='font-400 text-gray-500 md:text-[18px] text-[14px] md:w-[536px] w-[364px] text-center'>
          {t.blogdes}
        </p>
      </motion.div>

      <div className='py-10 md:flex justify-between'>
        <motion.div 
          className='md:w-[520px]'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <img 
            src='/blog1.jpg' 
            alt='blog' 
            className='rounded-4 mb-4 md:w-[510.24px] md:h-[340.77px] h-[248.58px] w-[372.18px] transition-transform duration-300 hover:scale-105 hover:shadow-lg object-cover'
          />
          <div className='md:flex md:flex-row justify-between flex flex-col-reverse'>
            <h1 className='md:w-[386px] font-400 md:text-[26px] text-[22px] w-[372px] h-[58px]'>
              {t.blog1title}
            </h1>
            <p className='md:font-300 text-[15px]'>{t.blogdate}</p>
          </div>
          <p className='md:w-[500px] md:h-[60px] h-[96px] w-[374px] font-400 text-[16.4px] text-gray-500 mt-7'>
            {t.blog1des}
          </p>
        </motion.div>

        <div className='flex flex-col justify-between md:mt-0 mt-10'>
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className='flex md:mt-0 mt-4'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <div className='flex flex-col gap-2'>
                <h1 className='md:w-[294px] w-[220px] text-[14px] font-400 md:text-[20px]'>
                  {index === 1 
                    ? `${t.blog2title}`
                    : index === 2 
                    ? `${t.blog3title}`
                    : `${t.blog4title}`}
                </h1>
                <p className='md:w-[294px] w-[220px] text-[12px] font-400 md:text-[12.4px] text-gray-500'>
                  {index === 1 
                    ? `${t.blog2des}`
                    : index === 2 
                    ? `${t.blog3des}`
                    : `${t.blog4des}`}
                </p>
                <p className='md:w-[86px] w-[86px] text-[12px] font-300 md:text-[10px]'>
                  {t.blogdate}
                </p>
              </div>
              <img 
                src={`/blog${index + 1}.jpg`} 
                alt='blog' 
                className='md:w-[198.92px] md:h-[129px] w-[145px] h-[94.03px] rounded-[6px] transition-transform duration-300 hover:scale-105 hover:shadow-md object-cover'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;