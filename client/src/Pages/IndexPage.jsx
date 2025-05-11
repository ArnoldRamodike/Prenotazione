import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState("");
  const baseURL = "http://localhost:4000";

  useEffect(() => {
    axios.get("/api/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id} className="">
            <div className="bg-gray-500 rounded-2xl flex mb-2 cursor-pointer">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={`${baseURL}/uploads/` + place.photos?.[0]}
                  alt="Place avatar"
                />
              )}
            </div>
            <h2 className="font-bold capitalize flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
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
            </h2>
            <h3 className=" ml-1 text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold ml-1">R{place.price}</span> Per Night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
