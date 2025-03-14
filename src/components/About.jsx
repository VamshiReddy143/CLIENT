import React from 'react'
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const About = () => {

    const { language } = useLanguage();
    const t = translations[language];
    return (
        <div className='md:flex gap-[4em] items-center py-10 md:py-4 px-4 md:px-10'>
            <div className='md:w-[40%] md:flex hidden'>
                <img src='/about.png' alt='about' />
            </div>
            <div className='md:w-[60%]'>
                <h1 className='font-700 font-bold md:text-[57px] text-[32px] mb-4'>{t.title}</h1>
                <p className='font-200 text-[18px] text-gray-600'>{t.paragraph1}</p>

                <p className='font-200 text-[18px] text-gray-600 mt-7'>{t.paragraph2}</p>
            </div>
        </div>
    )
}

export default About