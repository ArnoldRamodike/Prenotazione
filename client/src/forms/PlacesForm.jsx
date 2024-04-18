import axios from 'axios';
import { useState } from 'react'
import PhotosUploader from '../Components/PhotosUploader';
import Perks from '../Components/Perks';
import AccountNav from '../Components/AccountNav';
import { Navigate } from 'react-router-dom';

const PlacesForm = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

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

     async function addNewPlace(ev) {
      ev.preventDefault();
      await axios.post('/places', {
          title, address, addedPhotos, 
          description, perks, extraInfo, 
          checkIn, checkOut, maxGuests
      });
      setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'account/places'}/>
    }

  return (
    <div >
        <AccountNav/>
    <form onSubmit={addNewPlace}>
       {preInput('title', 'Title of your place, keep it short and simple')}
      <input type="text" placeholder="title" value={title} onChange={ev => setTitle(ev.target.value)}/>
      {preInput('Address', 'The place physical address')}
      <input type="text" placeholder="address" value={address} onChange={ev => setAddress(ev.target.value)}/>
     <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
      {preInput('Description', 'This describe the place and how it stands out')}
      <textarea className="" placeholder="place description" value={description} onChange={ev => setDescription(ev.target.value)}/>
      <h2 className="text-2xl mt-4">Perks</h2>
      <p className="text-gray-500 text-sm">Includes:</p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
          <Perks selected={perks} onchange={setPerks} />
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
  )
}

export default PlacesForm