import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../Components/BookingWidget";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState('');
    const [showAllPhotos, setshowAllPhotos] = useState(false);

    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
      })
    
    }, [id]);

    if (showAllPhotos) {
        return(
        <div className="absolute inset-0 bg-black text-white min-h-screen ">
            <div className="p-8 grid gap-4 bg-black">
                <div className=" ">
                    <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                    <button onClick={() => setshowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl text-black shadow shadow-black">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                        Close Photos
                    </button>
                </div>
                {place.photos?.length > 0  && place.photos.map((photo) => (
                <div key={photo}>
                    <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+photo} alt="Main picture" />
                </div>                    
                ))}
            </div>
        </div>)
    }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-4">
         <h1 className="text-3xl">{place.title}</h1>
           <a target="_blank" href={`https://maps.google.com/?q=${place.address}`} className="my-3 flex gap-1 font-semibold underline  ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {place.address}
           </a>
         <div className="relative">
           <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div >
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" 
                            src={'http://localhost:4000/uploads/'+place.photos?.[0] } alt="Main picture" />
                        </div>
                    )}
                </div>
                <div className="grid ">
                  {place.photos?.[0] && (
                        <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover" 
                        src={'http://localhost:4000/uploads/'+place.photos?.[0] } alt="Main picture" />
                    )}
                    <div className="overflow-hidden">
                      {place.photos?.[0] && (
                        <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover relative top-2" 
                        src={'http://localhost:4000/uploads/'+place.photos?.[0] } alt="Main picture" />
                      )}
                    </div>     
                </div>
            </div>
         <button onClick={() => setshowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
             show more photos
        </button>
      </div>
      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
         </div>
          Check in: {place.checkIn} <br />
          Check out: {place.checkOut} <br />
          Max Guests {place.maxGuest}
         
        </div>
        <div className="">
            <BookingWidget place={place}/>
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
  )
}
