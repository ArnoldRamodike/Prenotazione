import axios from 'axios';
import { useState, useEffect } from 'react'
import PhotosUploader from '../Components/PhotosUploader';
import Perks from '../Components/Perks';
import AccountNav from '../Components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesForm = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);


    useEffect( () => {
      if (!id) {
        return;
      }
       axios.get('/places/'+id).
      then(response => {
        const {data} = response;
        setTitle(data.title);
        setDescription(data.description);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setExtraInfo(data.extraInfo);
        setPerks(data.perks);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuest);
        setPrice(data.price);
      });

    }, [id])

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

     async function savePlace(ev) {
      ev.preventDefault();
      const placeData = {title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuest, price}
      if (id) {
        //Update functiionality
        await axios.put(`/places/${id}`, {
          id, ...placeData,
      }); 
      }else{
       //Create new place 
      await axios.post('/places', placeData);       
      }

      setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

  return (
    <div >
      <AccountNav/>
     <form onSubmit={savePlace}>
        {preInput('title', 'Title of your place, keep it short and simple')}
        <input type="text" placeholder="title" value={title} onChange={ev => setTitle(ev.target.value)}/>
        {preInput('Address', 'The place physical address')}
        <input type="text" placeholder="address" value={address} onChange={ev => setAddress(ev.target.value)}/>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        {preInput('Description', 'This describe the place and how it stands out')}
        <textarea className="" placeholder="place description" value={description} onChange={ev => setDescription(ev.target.value)}/>
        {preInput('Perks', 'What the place includes.')}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2">
            <Perks selected={perks} onchange={setPerks} />
          </div>
        {preInput('Extra Informaton', 'More relevent information for the place')}
        <textarea className="" placeholder="Optional" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
        {preInput('Check in&out', 'How long you going to stay')}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="">
            <h3 className="mt-2 -mb-2">Check in</h3>
            <input type="text" placeholder="18:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="">
          <h3 className="mt-2 -mb-2">Check out</h3>
            <input type="text" placeholder="10:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
          <div className="">
          <h3 className="mt-2 -mb-2">Max Guests</h3>
            <input type="number" placeholder="1" value={maxGuest} onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>  
          <div className="">
            <h3 className="mt-2 -mb-2">Price per night</h3>
            <input type="number" placeholder="1" value={price} onChange={ev => setPrice(ev.target.value)}/>
          </div>  
        </div>
        <button className="primary my-4">{id? 'Update': 'Save'}</button>
    </form>
  </div>  
  )
}

export default PlacesForm