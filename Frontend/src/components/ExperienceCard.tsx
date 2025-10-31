import React from 'react'
import { Link } from 'react-router-dom';
interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  
}
interface ExperienceCardProps{
    experience: Experience;
}
const ExperienceCard: React.FC<ExperienceCardProps> = ({experience}) => {
    
  return (
    <div className='sm:w-[280px] sm:h-[312px] w-[250px] h-[262px] bg-[#F0F0F0] rounded-lg overflow-hidden font-inter'>
      <img className='w-[280px] sm:h-[170px] h-[120px]' src={experience.image} alt="" />
      <div className='sm:px-[16px] sm:py-[10px] px-[8px] py-[5px] sm:gap-[12px] gap-[10px] flex flex-col'>
        <div className='flex justify-between items-center'>
        <h1 className='sm:text-[16px] text-[14px]  font-[500]'>{experience.title}</h1>
        <span className='bg-[#D6D6D6] py-1 px-2 sm:text-[11px]  text-[8px] font-[500] rounded'>Udupi</span>
      </div>
        <p className='sm:text-[12px] text-[12px] leading-4 text-[#6C6C6C] overflow-hidden'>{experience.description}</p>
      <div className='flex justify-between'>
        <p className='  text-[12px] flex items-center gap-2'>From <span className='sm:text-[20px] text-[14px] font-medium'>{experience.price}</span> </p>
        <Link to={`/experience/${experience._id}`}  state={{ experience }} className='bg-[#FFD643] sm:px-[8px] sm:py-[6px] px-[5px] py-[4px] rounded sm:text-[14px] text-[12px]'>View Details</Link>
      </div>
      </div>
    </div>
  )
}

export default ExperienceCard
