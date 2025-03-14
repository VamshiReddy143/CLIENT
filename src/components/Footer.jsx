import React from 'react';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from 'framer-motion';

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
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      x: 10,
      color: "#f97316", // orange-500
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className='bg-black text-[#FFFFFF] p-10'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className='md:flex items-center justify-between'>
        <motion.div variants={itemVariants}>
          <h1 className='font-700 md:text-[30px] text-[28px]'>
            {t.brand.split(" ")[0]} <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
          </h1>
          <p className='font-400 md:text-[15px] md:w-[484px] text-[14px] w-[360px] mt-5'>
            {t.footerdes}
          </p>
          <div className='flex gap-3 mt-5'>
            {['linked.svg', 'fb.png', 'insta.png'].map((src, index) => (
              <motion.img
                key={index}
                src={`/${src}`}
                alt={src.split('.')[0]}
                className='w-[36px] h-[36px] cursor-pointer'
                variants={socialIconVariants}
                whileHover="hover"
              />
            ))}
          </div>
        </motion.div>

        <div className='md:flex flex flex-col md:flex-row gap-10 items-start mt-10'>
          <motion.div variants={itemVariants}>
            <h2 className='font-700 md:text-[24px] text-[24px] mb-5'>{t.footerlinktitle}</h2>
            <ul className='cursor-pointer'>
              {[t.footerlinkhome, t.footerlinkabout, t.footerlinklistings, t.footerlistingblogs, t.footerlistingcontactus].map((link, index) => (
                <motion.li
                  key={index}
                  className='md:text-[18px] font-400'
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className='font-700 text-[24px] mb-5'>{t.footerlistingcontactus}</h2>
            <div className='flex flex-col gap-4'>
              {[
                { src: 'location.svg', text: t.footercontactmap },
                { src: 'phone.svg', text: '+12 345 6789' },
                { src: 'mail.svg', text: 'support@marketplaceplatform.com' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className='flex gap-2 items-center'
                  variants={itemVariants}
                >
                  <img src={`/${item.src}`} alt={item.src.split('.')[0]} className='h-[38px] w-[38px]' />
                  <p className='md:w-[283px] font-400 md:text-[18px]'>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <motion.div
          className='bg-white h-[2px] w-full mt-10'
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.p
          className='md:w-[313px] font-400 md:text-[18px] text-center mt-5'
          variants={itemVariants}
        >
          {t.copyright}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Footer;