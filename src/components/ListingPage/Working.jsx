



import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../context/LanguageContext";
// import { translations } from ".../lib/translations";
import { translations } from "../../lib/translations";

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
        <div className="min-h-screen py-8 sm:py-10 md:py-0  lg:py-16 flex flex-col items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12">
            {/* Header Section */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[57px] text-gray-800 leading-tight text-center"
            >
                {t.workingTitle}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-400 mt-7 sm:mt-4 max-w-md sm:max-w-lg md:max-w-2xl text-center"
            >
                {t.workingDescription}
            </motion.p>

            {/* Cards Section */}
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-30 px-4 sm:px-6 md:px-8"
                style={{ y: yParallax }}
            >
                {/* Card 1 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-[#FF8126] to-[#FF5E00] shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full">
                        <motion.h1
                            className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FFFFFF] z-10"
                            whileHover={{ scale: 1.1 }}
                        >
                            1
                        </motion.h1>
                        <motion.img
                            variants={imageVariants}
                            src="/search111.svg"
                            alt="search"
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain z-10"
                        />
                        <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#FFFFFF] z-10 text-center">
                            {t.card1Title}
                        </h2>
                        <p
                            className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-[#FFFFFF] opacity-90 z-10 text-center"
                            dangerouslySetInnerHTML={{ __html: t.card1Description }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full">
                        <motion.h1
                            className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FF8126] z-10"
                            whileHover={{ scale: 1.1 }}
                        >
                            2
                        </motion.h1>
                        <motion.img
                            variants={imageVariants}
                            src="/mail111.svg"
                            alt="request"
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain z-10"
                        />
                        <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-black z-10 text-center">
                            {t.card2Title}
                        </h2>
                        <p
                            className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-700 z-10 text-center"
                            dangerouslySetInnerHTML={{ __html: t.card2Description }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]" />
                    </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full">
                        <motion.h1
                            className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FF8126] z-10"
                            whileHover={{ scale: 1.1 }}
                        >
                            3
                        </motion.h1>
                        <motion.img
                            variants={imageVariants}
                            src="/tag111.svg"
                            alt="start"
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain z-10"
                        />
                        <h2
                            className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-black z-10 text-center"
                            dangerouslySetInnerHTML={{ __html: t.card3Title }}
                        />
                        <p
                            className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-700 z-10 text-center"
                            dangerouslySetInnerHTML={{ __html: t.card3Description }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]" />
                    </div>
                </motion.div>
            </motion.div>

        </div>
    );
};

export default Working;



