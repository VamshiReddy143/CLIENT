
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

const Serve = () => {
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
        <div className="py-8 sm:py-10  lg:py-16 flex flex-col items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12">
            {/* Header Section */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[57px] text-gray-800 leading-tight text-center"
            >
                {t.serveTitle}
            </motion.h1>
         

            {/* Cards Section */}
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-15 mt-20 sm:mt-12 md:mt-[6em] lg:mt-[7em] px-4 sm:px-6 md:px-8"
                style={{ y: yParallax }}
            >
                {/* Card 1 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[286px]  sm:h-[360px] md:h-[318px] lg:h-[350px] lg:w-[350px] w-full max-w-[377px] sm:max-w-[300px] md:max-w-[377px] lg:max-w-[377px] rounded-[20px]  bg-gradient-to-br from-white to-gray-100  shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 mt-4 h-full">
                   
                        <motion.img
                            variants={imageVariants}
                            src="/owners.svg"
                            alt="search"
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-[54px] md:h-[44.28px] object-contain z-10"
                        />
                        <h2 className="font-bold text-lg sm:text-xl md:text-[2xl] lg:text-[24px] text-black z-10 text-center">
                            {t.servecard1Title}
                        </h2>
                        <p
                            className="font-normal w-[238.5px] text-[18px] sm:text-base md:text-lg lg:text-[20px] lg:w-[280px] text-#646A69 opacity-90 z-10 text-center"
                            dangerouslySetInnerHTML={{ __html:t.servecard1Description} }
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]" />
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[286px] sm:h-[360px] md:h-[318px] lg:h-[350px] lg:w-[350px] lg:max-h-auto w-full max-w-[377px] sm:max-w-[300px] md:max-w-[377px] lg:max-w-[377px] rounded-[20px] bg-gradient-to-br from-[#FF8126] to-[#FF5E00] shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 mt-4 sm:p-8 h-full">
                       
                        <motion.img
                            variants={imageVariants}
                            src="/vendors.svg"
                            alt="request"
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-[54px] md:h-[44.28px] object-contain z-10"
                        />
                        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-white z-10 text-center">
                            {t.servecard2Title}
                        </h2>
                        <p
                            className="font-normal text-[18px] w-[238.5px] sm:text-base md:text-lg lg:text-[20px] lg:w-[280px]  text-gray-100 z-10 text-center"
                            dangerouslySetInnerHTML={{__html:t.servecard2Description} }
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]" />
                    </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="h-[286px] sm:h-[360px] md:h-[318px] lg:h-[350px] lg:w-[350px] w-full max-w-[377px] sm:max-w-[300px] md:max-w-[377px] lg:max-w-[377px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto"
                >
                    <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 mt-4 sm:p-8 h-full">
                      
                        <motion.img
                            variants={imageVariants}
                            src="/partners.svg"
                            alt="start"
                           className="w-16 h-16 sm:w-18 sm:h-18 md:w-[54px] md:h-[44.28px] object-contain z-10"
                        />
                        <h2
                            className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px] text-black z-10 text-center"
                            dangerouslySetInnerHTML={{__html:t.servecard3Title} }
                        />
                        <p
                            className="font-normal text-[18px] w-[238.5px] sm:text-base md:text-lg lg:text-[20px] lg:w-[280px] text-gray-700 z-10 text-center"
                            dangerouslySetInnerHTML={{__html:t.servecard3Description} }
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)]" />
                    </div>
                </motion.div>
            </motion.div>




            
        </div>
    );
};

export default Serve;



