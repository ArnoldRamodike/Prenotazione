import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../Components/BookingWidget";
import PlaceGalary from "../Components/PlaceGalary";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-4">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
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
        {place.address}
      </a>
      <PlaceGalary place={place} />
      <div className="mt-8 gap-y-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4 gap-y-2">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check in: {place.checkIn} <br />
          Check out: {place.checkOut} <br />
          Max Guests {place.maxGuest}
        </div>
        <div className="">
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white mt-8 -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Information</h2>
        </div>
        <div className="text-sm text-gray-800 leading-4 ">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
