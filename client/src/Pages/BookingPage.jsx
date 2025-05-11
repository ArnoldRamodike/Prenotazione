import { useParams } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaceGalary from "../Components/PlaceGalary";
import { format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      const foundBOoking = response.data.find(({ _id }) => _id === id);
      if (foundBOoking) {
        setBooking(foundBOoking);
      }
    });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <>
      <AccountNav />
      <div className="my-8">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <a
          target="_blank"
          href={`https://maps.google.com/?q=${booking.place.address}`}
          className="my-3 flex gap-1 font-semibold underline  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {booking.place.address}
        </a>
        <div className="bg-gray-200 my-6 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-2">Your booking Information </h2>
            <div className="border-t border-gray-300 my-2 py-2 flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {format(new Date(booking.checkIn), "yyyy-MM-dd")}
              &rarr;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              {format(new Date(booking.checkOut), "yyyy-MM-dd")}
            </div>
            <div className="bg-primary p-4 text-white rounded-2xl">
              <div className="">Total Price</div>
              <div className="text-2xl">R{booking.price}</div>
            </div>
          </div>
        </div>
        <PlaceGalary place={booking.place} />
      </div>
    </>
  );
};

export default BookingPage;
