import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
interface NavbarProps {
  onSearch: (query: string) => void;
}
const Navbar: React.FC<NavbarProps>= ({onSearch}) => {
   const [showPlaceholder, setShowPlaceholder] = useState(false);

  return (
    <div className='w-full sm:h-[87px] h-[50px] shadow-md  justify-between flex items-center lg:px-28 px-2' >
      <div className='sm:w-[100px] w-[70px] '><img className='' src="/images/attachment.png" alt="" /></div>
      <div className=' gap-3 flex '>
        <input  onBlur={() => setShowPlaceholder(false)} onFocus={()=>setShowPlaceholder(true)} onChange={(e)=>onSearch(e.target.value)} className='sm:h-[42px] h-[32px] sm:w-72 w-full sm:px-6 px-2  bg-[#EDEDED] rounded text-[#727272] sm:text-[14px] text-[10px] outline-none' type="text" placeholder={showPlaceholder ? "Search Experiences" : ""}/>
        <button className='bg-[#FFD643] sm:py-2 sm:px-5 px-3 rounded-md sm:text-[14px] text-[12px] sm:block hidden'>Search</button>
        <button className="bg-[#FFD643] p-2 rounded-md text-[16px] sm:hidden block">
           <FiSearch />
        </button>
      </div>

      
    </div>
  )
}

export default Navbar
