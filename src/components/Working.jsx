import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const Working = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 100, rotateX: 15, scale: 0.95 },
        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], type: "spring", bounce: 0.3 } },
        hover: { scale: 1.05, rotateY: 5, boxShadow: "0 15px 30px rgba(0,0,0,0.25)", transition: { duration: 0.4, ease: "easeOut" } },
    };

    const imageVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 } },
        hover: { scale: 1.15, rotate: 5 },
    };

    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <div className='min-h-screen py-[5em] flex flex-col items-center overflow-hidden md:py-[7em] px-4 md:px-10'>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='font-700 text-[57px] font-bold'
            >
                {t.workingTitle}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='font-200 text-gray-400 text-[18px] text-center max-w-2xl'
            >
                {t.workingDescription}
            </motion.p>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className='md:grid grid-cols-3 gap-12 mt-[8em] px-8 flex flex-col'
                style={{ y: yParallax }}
            >
                {/* Card 1 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className='h-[400px] w-[320px] rounded-[20px] bg-gradient-to-br from-[#FF8126] to-[#FF5E00] shadow-2xl relative overflow-hidden cursor-pointer'
                >
                    <div className='flex flex-col items-center gap-3 p-8 h-full'>
                        <motion.h1 className='font-700 text-[60px] font-extrabold text-[#FFFFFF] z-10' whileHover={{ scale: 1.1 }}>1</motion.h1>
                        <motion.img variants={imageVariants} src="/search.png" alt="search" className='w-20 h-20 object-contain z-10' />
                        <h2 className='font-400 text-[28px] text-[#FFFFFF] z-10 text-center'>{t.card1Title}</h2>
                        <p className='font-400 text-[18px] text-[#FFFFFF] opacity-90 z-10 text-center' dangerouslySetInnerHTML={{ __html: t.card1Description }} />
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]' />
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className='h-[400px] w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer'
                >
                    <div className='flex flex-col items-center gap-3 p-8 h-full'>
                        <motion.h1 className='font-700 text-[60px] font-extrabold text-[#FF8126] z-10' whileHover={{ scale: 1.1 }}>2</motion.h1>
                        <motion.img variants={imageVariants} src="/mail.png" alt="request" className='w-20 h-20 object-contain z-10' />
                        <h2 className='font-400 text-[28px] text-black z-10 text-center'>{t.card2Title}</h2>
                        <p className='font-400 text-[18px] text-gray-700 z-10 text-center' dangerouslySetInnerHTML={{ __html: t.card2Description }} />
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]' />
                    </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className='h-[400px] w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer'
                >
                    <div className='flex flex-col items-center gap-3 p-8 h-full'>
                        <motion.h1 className='font-700 text-[60px] font-extrabold text-[#FF8126] z-10' whileHover={{ scale: 1.1 }}>3</motion.h1>
                        <motion.img variants={imageVariants} src="/tag.png" alt="start" className='w-20 h-20 object-contain z-10' />
                        <h2 className='font-400 text-[28px] text-black z-10 text-center' dangerouslySetInnerHTML={{ __html: t.card3Title }} />
                        <p className='font-400 text-[18px] text-gray-700 z-10 text-center' dangerouslySetInnerHTML={{ __html: t.card3Description }} />
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]' />
                    </div>
                </motion.div>
            </motion.div>

            <div className='mt-[2em] w-[744px] h-[229.96px] flex justify-end bg-[#F3F3F4]'>
                <img src='/sideimg.png' className='m-0 p-0 right-0 absolute' />
            </div>
        </div>
    );
};

export default Working;