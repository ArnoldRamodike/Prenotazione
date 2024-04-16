import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "../Components/Perks";
import axios from 'axios';

const PlacesPage = () => {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
      return(
        <h2 className="text-2xl mt-4">{text}</h2>
      )
    }
    function inputDescription(text) {
      return(
        <p className="text-gray-500 text-sm">{text}</p>
      )
    }

    function preInput(header, description) {
      return (
        <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
      )
    }

    async function addPhotoByLink(ev) {
      ev.preventDefault();
      const {data: filename} = await axios.post('/upload-by-link',{link: photoLink});
      setAddedPhotos(prev => {
        return [...prev, filename]
      });
      setPhotoLink('');
    }

  return (
    <div className="">
        {action !='new' && (
        <div className="text-center">
            <Link className="bg-primary text-white inline-flex gap-1 py-2 px-6 rounded-full" to={'/account/places/new'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              Add New place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div className="">
            <form>
                 {preInput('title', 'Title of your place, keep it short and simple')}
                <input type="text" placeholder="title" value={title} onChange={ev => setTitle(ev.target.value)}/>
                {preInput('Address', 'The place physical address')}
                <input type="text" placeholder="address" value={address} onChange={ev => setAddress(ev.target.value)}/>
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">Catchy ones mate</p>
                <div className="flex">
                  <input type="text" placeholder={'Add using link ...jpg'} value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                  <button onClick={addPhotoByLink} className="bg-gray-200 px-4 gap-2 rounded-2xl ">Grab &nbsp; photo</button>
                </div>
                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {addedPhotos?.length > 0 && addedPhotos.map(photo => (
                    <div className="" key={photo.id}>
                        <img className="rounded-2xl" src={`http://localhost:4000/uploads/${photo}`} alt="Place photo" />
                    </div>
                  ))}
                   <button className="bg-transparent border rounded-2xl p-2 mt-4 flex justify-center gap-1 items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                      Upload
                   </button>
                </div>
                {preInput('Description', 'This describe the place and how it stands out')}
                <textarea className="" placeholder="place description" value={description} onChange={ev => setDescription(ev.target.value)}/>
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">Includes:</p>
                  <div>
                    <Perks selected={perks} onChange={setPerks} />
                  </div>
                {preInput('Extra Informaton', 'More relevent information for the place')}
                <textarea className="" placeholder="Optional" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                <h2 className="text-2xl mt-4">Check in&out</h2>
                <p className="text-gray-500 text-sm">Includes:</p>
                <div className="grid sm:grid-cols-3 gap-2">
                  <div className="">
                    <h3 className="mt-2 -mb-2">Check in</h3>
                    <input type="text" placeholder="18:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                  </div>
                  <div className="">
                  <h3 className="mt-2 -mb-2">Check in</h3>
                    <input type="text" placeholder="10:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                  </div>
                  <div className="">
                  <h3 className="mt-2 -mb-2">Check in</h3>
                    <input type="number" placeholder="1" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                  </div>  
                </div>
                <button className="primary my-4">Save</button>
               
            </form>
            </div>   
        )}
    </div>
  )
}

export default PlacesPage