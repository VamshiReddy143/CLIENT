import React from 'react'
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

const Highlights = () => {

   const { language } = useLanguage();
    const t = translations[language];
  return (
    <div className="relative  lg:min-h-[100vh] mt-[1rem] mx-auto px-[1rem] sm:px-[1.5rem] md:px-[2.5rem] md:py-10 lg:py-10 lg:px-[3rem] w-full max-w-[1440px] md:mb-10">
     <div className='md:shadow-xl py-5 px-1 md:w-fit rounded-xl'>
     <div>
     <h1 className='text-[30px] leading-[100%] font-400  mb-[1em] font-[belanosima]'>{t.Space_Highlights}</h1>
     <div>
       <p className='text-[#7D7D7D] md:w-[700px] lg:w-[823px] w-full font-[poppins] text-[14.4px]'>{t.prime_loc_des}</p>      
    <div className='ml-3 clear-both text-[#7D7D7D]  font-[poppins] text-[14.4px] leading-[170%]'>
        <li>{t.point1}</li>
        <li>{t.point2}</li>
        <li>{t.point3}</li>
        <li>{t.point4}</li>
        <li>{t.point5}</li>
        <li>{t.point6}</li>
    </div>
     </div>
     </div>


     <div>
     <h1 className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2' >{t.heading2}</h1>   
    <div className='ml-3 clear-both text-[#7D7D7D]  font-[poppins] text-[14.4px] leading-[170%]'>
        <li>{t.point7}</li>
        <li>{t.point8}</li>
        <li>{t.point9}</li>
    </div>
    
     </div>



     <div>
     <h1  className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2'  >{t.heading3}</h1>   
    <div className='ml-3 clear-both text-[#7D7D7D]  font-[poppins] text-[14.4px] leading-[170%]'>
        <li>{t.point10}</li>
        <li>{t.point11}</li>
        <li>{t.point12}</li>
        <li>{t.point13}</li>
        <li>{t.point14}</li>
    </div>
    
     </div>


     <div>
     <h1  className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2'  >{t.heading4}</h1>   
    <div className='ml-3 clear-both text-[#7D7D7D]  font-[poppins] text-[14.4px] leading-[170%]'>
        <li>{t.point15}</li>
        <li>{t.point16}</li>
        <li>{t.point17}</li>
        <li>{t.point18}</li>
        <li>{t.point19}</li>
    </div>
    
     </div>


     <div className='md:block hidden' >
     <h1 className='leading-[100%] font-400 mt-7 font-400 text-[14.4px]  font-[poppins]'><span className='text-[#FF8126] w-full font-bold text-[14.4px] mr-1'>{t.question1 }</span>{ t.question2}</h1>   
     </div>

     </div>



     <div className='block md:hidden py-5 ' >
     <h1 className='leading-[100%] font-400 mt-7 font-400 text-[14.4px]   font-[poppins]'><span className='text-[#FF8126] w-full font-bold text-[14.4px] mb-3 block'>{t.question1}</span>{t.question3}<span className='block mb-3 mt-3'>+43 1 234 5678</span>{t.question4}</h1>   
     </div> 
     <div >
        <img src='/pizzahut.svg' alt='pizzahutimage' className='absolute md:hidden md:h-[310px]  lg:block lg:w-[296.22px] lg:h-[310px] w-[149px] h-[155px] md:bottom-5 bottom-0 right-4'/>
     </div>

    </div>
  )
}

export default Highlights