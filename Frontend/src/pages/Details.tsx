import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  // add any other fields your mockapi experience has
}

interface ExperienceResponse {
  experience: Experience;
  slots: [];
}

const Details: React.FC = () => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const getDetails = async () => {
    try {

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/experiences/${id}`,
        {
          method: "GET",
        }
      );
      const data: ExperienceResponse = await response.json();
      console.log(data);
      setExperience(data.experience);
      setSlots(data.slots);
    } catch (error) {
      console.error("Error fetching experiences", error);
    }
  };
  const handleSlotAvailability = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/slots/${id}/availability`
      );
      const data = await response.json();

      if (response.ok) {
        //console.log("Slot Availability:", data.slots);
        setSlots(data.slots);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching slot availability:", error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await getDetails();
      await handleSlotAvailability();
    };
    fetchAll();
  }, [id]);

  if (!experience) return <p>No experience found</p>;
  return (
    <div className="flex flex-col  w-[100%] gap-5">
      <h1 className="flex items-center gap-2 sm:text-[20px] text-[12px]">
        <IoArrowBack
          onClick={() => navigate(-1)}
          size={20}
          className="cursor-pointer"
        />
        Details
      </h1>
      <div className="flex lg:flex-row flex-col sm:gap-10 gap-5">
        <img
          className="lg:w-[60%] lg:h-[381px] md:w-[100%] rounded-xl object-cover"
          src={experience.image}
          alt="ok"
        />
        <div className="lg:w-[30%] md:w-[100%] sm:h-[303px]  flex  bg-[#EFEFEF] sm:p-[24px] p-[14px]  flex-col sm:gap-[12px] gap-[8px] sm:text-[16px] text-[12px] text-[#656565] rounded-xl">
          <p className="flex justify-between">
            Price <span className="text-black ">₹{experience.price}</span>
          </p>
          <p className="flex justify-between">
            Quantity{" "}
            <span>
              {" "}
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>{" "}
              {quantity}{" "}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </span>
          </p>
          <p className="flex justify-between">
            Subtotal<span className="text-black">₹999</span>
          </p>
          <p className="flex justify-between">
            Taxes <span className="text-black ">₹65</span>
          </p>
          <hr className="border-t border-[#D9D9D9] border-[1px]" />
          <h1 className="text-black sm:text-[20px] text-[14px] flex justify-between">
            Total{" "}
            <span className="text-black ">₹{experience.price * quantity}</span>
          </h1>
          <span className="bg-[#D9D9D9] "></span>
          <Link
            onClick={(e) => {
              if (!selectedDate || !selectedTime) {
                e.preventDefault();
                return;
              }
            }}
            to={`/experience/${id}/checkout`}
            state={{
              experience,
              slots,
              selectedDate,
              selectedTime,
              selectedSlot,
              quantity,
            }}
            className={`sm:px-[20px] sm:py-[12px] px-[12px] py-[6px] sm:rounded-lg rounded-md font-[500] text-center ${
              selectedDate && selectedTime
                ? "bg-[#FFD643] text-black hover:bg-[#ffcc00]"
                : "bg-gray-300 text-[#838383] cursor-not-allowed"
            }`}
          >
            Confirm
          </Link>
        </div>
      </div>
      <div className="h-[406px] w-[765px]  sm:gap-4 gap-2 flex flex-col">
        <div className="flex flex-col gap-2 flex-wrap">
          <h1 className="md:text-[24px] sm:text-[14px] text-[12px]  font-[500]">
            {experience.title}
          </h1>
          <p className="sm:text-[16px] text-[10px] whitespace-normal break-words text-[#6C6C6C]">
            {experience.description}
          </p>
        </div>
        <h1 className="font-[500] sm:text-[18px] text-[12px]">Choose Date</h1>
        <div className="flex gap-3">
          {slots.map((slot) => (
            <button
              key={slot._id + "-date"}
              onClick={() => setSelectedDate(slot.date)}
              className={`sm:px-[12px] sm:py-[8px] sm:text-[16px] text-[10px] px-[5px] py-[3px] sm:rounded-md rounded border cursor-pointer transition-all ${
                selectedDate === slot.date
                  ? "bg-[#FFD643] border-[#FFD643] text-black"
                  : "border-[#BDBDBD] text-[#838383] hover:bg-[#FFF4CC]"
              }`}
            >
              {new Date(slot.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })}
            </button>
          ))}
        </div>
        <h1 className="font-[500] sm:text-[18px] text-[12px]">Choose Time</h1>
        <div className="flex gap-3">
          {slots &&
            slots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => {
                  setSelectedSlot(slot._id);
                  setSelectedTime(slot.time);
                }}
                className={`sm:px-[12px] sm:py-[8px] sm:text-[16px] text-[10px] px-[5px] py-[3px] sm:rounded-md rounded border cursor-pointer transition-all ${
                  selectedTime === slot.time
                    ? "bg-[#FFD643] border-[#FFD643] text-black"
                    : "border-[#BDBDBD] text-[#838383] hover:bg-[#FFF4CC]"
                } ${slot.remainingSeats <= 0 ? "sold out" : ""}`}
              >
                {slot.time.split("-")[0].trim()} {/* ✅ only first time */}
                <span className="text-[10px] ml-1">
                  {slot.capacity <= 0 ? (
                    <span className="text-[#838383]">Sold out</span>
                  ) : (
                    <span className="text-[#FF4C0A]">{slot.capacity} left</span>
                  )}
                </span>
              </button>
            ))}
        </div>
        <div className="flex flex-col gap-[12px]">
          <h1 className="font-[500] sm:text-[18px] text-[12px]">About</h1>
          <p className="bg-[#EEEEEE] sm:text-[12px] text-[8px] sm:px-[12px] sm:py-[8px] px-[5px] py-[3px] sm:rounded-md rounded text-[#838383]">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
