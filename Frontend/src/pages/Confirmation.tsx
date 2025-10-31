
import { MdCheck } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
const Confirmation = () => {
  const location = useLocation();
  const { booking } = location.state || "";
  
  console.log(booking)
  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-5 mt-10'>
      <div className='bg-[#24AC39] sm:w-[70px] sm:h-[70px] h-[40px] w-[40px] rounded-full flex items-center justify-center'> <MdCheck className="text-white text-4xl" /></div>
      <h1 className='sm:text-[32px] text-[24px]'>Booking Confirmed</h1>
      <p className='sm:text-[20px] text-[14px] text-[#656565]'>Ref ID: {booking._id}</p>
      <Link to="/" className='bg-[#E3E3E3] text-[#656565] sm:px-[16px] sm:py-[8px] px-[8px] py-[5px] rounded-md'>Back to Home</Link>
    </div>
  )
}

export default Confirmation
