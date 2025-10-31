import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
const Checkout = () => {
  const location = useLocation();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const promoRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { experience, selectedDate, selectedTime, quantity, selectedSlot } =
    location.state || {};
  const baseTotal = experience ? experience.price * quantity : 0;
  console.log(selectedDate, selectedTime);
  const applyPromo = async () => {
    const promoCode = promoRef.current?.value?.toUpperCase();

    if (!promoCode) {
      setPromoMessage("Please enter a promo code");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/promo/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: promoCode, price: baseTotal }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setPromoMessage(data.message || "Invalid code");
        setDiscountedPrice(null);
        return;
      }

      setPromoMessage(`✅ Promo applied: ${data.discountApplied}`);
      setDiscountedPrice(data.finalPrice);
    } catch (error) {
      console.error("Promo error:", error);
      setPromoMessage("Something went wrong");
    }
  };
  const handleBooking = async () => {
    if (!experience || !selectedDate || !selectedTime) {
      toast.error("Missing booking details");
      return;
    }

    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const promoCode = promoRef?.current?.value;

    if (!name || !email) {
      toast.info("Please fill in your name and email");
      return;
    }

    const bookingData = {
      experienceId: experience._id,
      slotId: selectedSlot,
      name,
      email,
      promoCode,
      totalPrice: discountedPrice ?? baseTotal,
      quantity,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.message === "You have already booked this experience.") {
        toast.info("⚠️ You’ve already booked this experience!");
        return;
        }
        toast.success("🎉 Booking Successful!");
        console.log("Booking:", data.booking);
        try {
          const slotUpdateResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/slots/update`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slotId: selectedSlot }),
            }
          );

          const slotData = await slotUpdateResponse.json();
          if (slotUpdateResponse.ok) {
            console.log("✅ Slot updated successfully:", slotData.slot);
          } else {
            console.warn("⚠️ Slot update failed:", slotData.message);
          }
        } catch (error) {
          console.error("Error updating slot:", error);
        }
        navigate(`/confirmation/${id}`, { state: { booking: data.booking } }); // redirect after booking
      } else {
        toast.error("Booking failed: " + data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error while booking");
    }
  };
  const handleInputChange = () => {
    const nameValue = nameRef.current?.value;
    const emailValue = emailRef.current?.value;
    setIsActive(!!(nameValue && emailValue));
  };
  return (
    <div className="flex flex-col w-[100%] sm:gap-5 gap-2 ">
      <h1 className="flex items-center gap-2">
        <IoArrowBack
          onClick={() => navigate(-1)}
          size={20}
          className="cursor-pointer"
        />
        Checkout
      </h1>
      <div className="flex lg:flex-row flex-col sm:gap-10 gap-5">
        <div className="lg:w-[60%] w-[100%] sm:h-[240px] h-[170px] bg-[#EFEFEF] sm:rounded-lg rounded-md sm:p-[24px] p-[14px] flex flex-col  sm:text-[14px] text-[10px] gap-[16px]">
          <div className="flex gap-3">
            <div className="flex flex-col w-[50%] sm:gap-[8px] gap-[4px]">
              <label htmlFor="name" className="text-[#5B5B5B]">
                Full name
              </label>
              <input
                ref={nameRef}
                onChange={handleInputChange}
                className="sm:px-[16px] sm:py-[12px] px-[8px] py-[5px] sm:rounded-lg rounded-md bg-[#DDDDDD] text-[#727272] outline-none"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col w-[50%] sm:gap-[8px] gap-[4px]">
              <label htmlFor="email" className="text-[#5B5B5B]">
                Email
              </label>
              <input
                ref={emailRef}
                onChange={handleInputChange}
                className="sm:px-[16px] sm:py-[12px] px-[8px] py-[5px] sm:rounded-lg rounded-md min-w-full bg-[#DDDDDD] text-[#727272] outline-none"
                type="email"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <input
              ref={promoRef}
              className="sm:px-[16px] sm:py-[12px] px-[8px] py-[5px] sm:rounded-lg rounded-md w-[80%] bg-[#DDDDDD] text-[#727272] outline-none"
              type="text"
              placeholder="Promo Code"
            />
            <button
              onClick={applyPromo}
              className="bg-[#161616] sm:px-[16px] sm:py-[12px] px-[8px] py-[5px] text-white sm:rounded-lg rounded-md"
            >
              Apply
            </button>
          </div>
          {promoMessage && (
            <p className="sm:text-[12px] text-[8px] text-gray-600">
              {promoMessage}
            </p>
          )}

          <p className="text-[#5B5B5B] flex items-center gap-3">
            <input type="checkbox" className="text-black " />I agree to the
            terms and safety policy
          </p>
        </div>
        <div className="lg:w-[30%] w-[100%] sm:h-[349px]  h-[230px] bg-[#EFEFEF] sm:p-[24px] p-[14px] flex flex-col sm:gap-[10px] gap-[5px] sm:text-[16px] text-[12px] text-[#656565] sm:rounded-xl rounded-md">
          <p className="flex justify-between">
            Experience <span className="text-black ">{experience.title}</span>
          </p>
          <p className="flex justify-between">
            Date{" "}
            <span className="text-black ">{selectedDate.split("T")[0]}</span>
          </p>
          <p className="flex justify-between">
            Time{" "}
            <span className="text-black ">{selectedTime.split("-")[0]}</span>
          </p>
          <p className="flex justify-between">
            Qty <span className="text-black ">{quantity}</span>
          </p>
          <p className="flex justify-between">
            Subtotal
            <span className="text-black ">₹{experience.price * quantity}</span>
          </p>
          <p className="flex justify-between">
            Taxes <span className="text-black">₹59</span>
          </p>
          <hr className="border-t border-[#D9D9D9] border-[1px]" />
          <h1 className="text-black sm:text-[20px] text-[14px] flex justify-between">
            Total <span className="text-black ">₹{(discountedPrice ?? baseTotal) + 59}</span>
          </h1>
          <button
            onClick={handleBooking}
            className={`bg-[#D7D7D7] sm:px-[20px] sm:py-[12px]  px-[12px] py-[6px] rounded-lg font-[500] text-[#7F7F7F] text-center
              ${
                isActive
                  ? "bg-[#FFD643] text-black hover:bg-[#ffcc00]"
                  : "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
              }
              `}
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
