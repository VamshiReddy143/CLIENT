



import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
        <div className="min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12">
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
                className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-400 mt-2 sm:mt-4 max-w-md sm:max-w-lg md:max-w-2xl text-center"
            >
                {t.workingDescription}
            </motion.p>

            {/* Cards Section */}
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-8"
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




            <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-[744px] h-[229.96px] flex justify-end bg-[#F3F3F4] overflow-hidden">
                <img src='/shops.svg' className='m-0 p-0 right-0 absolute' />
            </div>
        </div>
    );
};

export default Working;



// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useLanguage } from "../context/LanguageContext";
// import { translations } from "../lib/translations";

// const Working = () => {
//     const { language } = useLanguage();
//     const t = translations[language];

//     const { scrollYProgress } = useScroll();
//     const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
//     };

//     const cardVariants = {
//         hidden: { opacity: 0, y: 100, rotateX: 15, scale: 0.95 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             rotateX: 0,
//             scale: 1,
//             transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], type: "spring", bounce: 0.3 }
//         },
//         hover: {
//             scale: 1.05,
//             rotateY: 5,
//             boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
//             transition: { duration: 0.4, ease: "easeOut" }
//         },
//     };

//     const imageVariants = {
//         hidden: { scale: 0 },
//         visible: { scale: 1, transition: { duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 } },
//         hover: { scale: 1.15, rotate: 5 },
//     };

//     const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

//     return (
//         <div className="min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12">
//             {/* Header Section */}
//             <motion.h1
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[57px] text-gray-800 leading-tight text-center"
//             >
//                 {t.workingTitle}
//             </motion.h1>
//             <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-400 mt-2 sm:mt-4 max-w-md sm:max-w-lg md:max-w-2xl text-center"
//             >
//                 {t.workingDescription}
//             </motion.p>

//             {/* Cards Section */}
//             <motion.div
//                 ref={ref}
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate={inView ? "visible" : "hidden"}
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-8"
//                 style={{ y: yParallax }}
//             >
//                 {/* Card 1 */}
//                 <motion.div
//                     variants={cardVariants}
//                     whileHover="hover"
//                     className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto group"
//                 >
//                     <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full transition-all duration-400 ease-in-out group-hover:bg-gradient-to-br group-hover:from-[#FF8126] group-hover:to-[#FF5E00]">
//                         <motion.h1
//                             className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FF8126] z-10 group-hover:text-white transition-colors duration-400 ease-in-out"
//                             whileHover={{ scale: 1.1 }}
//                         >
//                             1
//                         </motion.h1>
//                         <motion.svg   className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-orange-500 hover:z-[99999]"  width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path className="group-hover:fill-white" d="M29.9999 6C26.2456 6.00201 22.5441 6.88475 19.193 8.57727C15.8418 10.2698 12.9345 12.7249 10.7046 15.7452C8.47477 18.7656 6.98458 22.2669 6.35383 25.9679C5.72309 29.6688 5.96938 33.4661 7.07292 37.0545C8.17645 40.643 10.1064 43.9225 12.7078 46.6295C15.3091 49.3365 18.5092 51.3954 22.0509 52.6409C25.5926 53.8863 29.3771 54.2836 33.1002 53.8006C36.8233 53.3176 40.3812 51.9679 43.4879 49.86L58.3199 64.68C58.7318 65.1221 59.2286 65.4767 59.7806 65.7227C60.3326 65.9686 60.9285 66.1009 61.5327 66.1115C62.137 66.1222 62.7371 66.0111 63.2975 65.7847C63.8578 65.5584 64.3668 65.2215 64.7941 64.7942C65.2214 64.3669 65.5583 63.8579 65.7846 63.2976C66.0109 62.7373 66.1221 62.1371 66.1114 61.5329C66.1008 60.9286 65.9685 60.3328 65.7226 59.7808C65.4766 59.2288 65.122 58.732 64.6799 58.32L49.8599 43.488C52.3117 39.8795 53.7335 35.6709 53.9725 31.3148C54.2115 26.9587 53.2587 22.6199 51.2163 18.7648C49.174 14.9097 46.1196 11.6842 42.3813 9.4351C38.6431 7.18602 34.3625 5.99842 29.9999 6ZM14.9999 30C14.9999 26.0218 16.5802 22.2064 19.3933 19.3934C22.2063 16.5804 26.0216 15 29.9999 15C33.9781 15 37.7934 16.5804 40.6065 19.3934C43.4195 22.2064 44.9999 26.0218 44.9999 30C44.9999 33.9783 43.4195 37.7936 40.6065 40.6066C37.7934 43.4197 33.9781 45 29.9999 45C26.0216 45 22.2063 43.4197 19.3933 40.6066C16.5802 37.7936 14.9999 33.9783 14.9999 30Z" fill="#FF8126" />
//                         </motion.svg>


//                         <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-black z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out">
//                             {t.card1Title}
//                         </h2>
//                         <p
//                             className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-700 z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out"
//                             dangerouslySetInnerHTML={{ __html: t.card1Description }}
//                         />
//                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] transition-all duration-400 ease-in-out" />
//                     </div>
//                 </motion.div>

//                 {/* Card 2 */}
//                 <motion.div
//                     variants={cardVariants}
//                     whileHover="hover"
//                     className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto group"
//                 >
//                     <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full transition-all duration-400 ease-in-out group-hover:bg-gradient-to-br group-hover:from-[#FF8126] group-hover:to-[#FF5E00]">
//                         <motion.h1
//                             className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FF8126] z-10 group-hover:text-white transition-colors duration-400 ease-in-out"
//                             whileHover={{ scale: 1.1 }}
//                         >
//                             2
//                         </motion.h1>
//                         <motion.img
//                             variants={imageVariants}
//                             src="/mail111.svg"
//                             alt="request"
//                             className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain z-10 transition-all duration-400 ease-in-out filter group-hover:brightness-0 group-hover:invert"
//                         />
//                         <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-black z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out">
//                             {t.card2Title}
//                         </h2>
//                         <p
//                             className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-700 z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out"
//                             dangerouslySetInnerHTML={{ __html: t.card2Description }}
//                         />
//                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] transition-all duration-400 ease-in-out" />
//                     </div>
//                 </motion.div>

//                 {/* Card 3 */}
//                 <motion.div
//                     variants={cardVariants}
//                     whileHover="hover"
//                     className="h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[320px] rounded-[20px] bg-gradient-to-br from-white to-gray-100 shadow-2xl relative overflow-hidden cursor-pointer mx-auto group"
//                 >
//                     <div className="flex flex-col items-center gap-2 sm:gap-3 p-6 sm:p-8 h-full transition-all duration-400 ease-in-out group-hover:bg-gradient-to-br group-hover:from-[#FF8126] group-hover:to-[#FF5E00]">
//                         <motion.h1
//                             className="font-extrabold text-4xl sm:text-5xl md:text-[60px] text-[#FF8126] z-10 group-hover:text-white transition-colors duration-400 ease-in-out"
//                             whileHover={{ scale: 1.1 }}
//                         >
//                             3
//                         </motion.h1>
//                         <motion.img
//                             variants={imageVariants}
//                             src="/tag111.svg"
//                             alt="start"
//                             className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain z-10 transition-all duration-400 ease-in-out filter group-hover:brightness-0 group-hover:invert"
//                         />
//                         <h2
//                             className="font-medium text-lg sm:text-xl md:text-2xl lg:text-[28px] text-black z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out"
//                             dangerouslySetInnerHTML={{ __html: t.card3Title }}
//                         />
//                         <p
//                             className="font-normal text-sm sm:text-base md:text-lg lg:text-[18px] text-gray-700 z-10 text-center group-hover:text-white transition-colors duration-400 ease-in-out"
//                             dangerouslySetInnerHTML={{ __html: t.card3Description }}
//                         />
//                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,129,38,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] transition-all duration-400 ease-in-out" />
//                     </div>
//                 </motion.div>
//             </motion.div>

//             <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-[744px] h-[229.96px] flex justify-end bg-[#F3F3F4] overflow-hidden">
//                 <img src='/shops.svg' className='m-0 p-0 right-0 absolute' />
//             </div>
//         </div>
//     );
// };

// export default Working;
