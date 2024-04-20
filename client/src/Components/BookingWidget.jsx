import { useState } from "react";
import {differenceInCalendarDays} from 'date-fns'

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
  return (
    <div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">
                 Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
              <div className="flex">
                  <div className=" py-4 px-4">
                  <label>Check In</label>
                  <input type="date" value={checkIn}  onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className=" py-4 px-4  border-l">
                  <label>Check Out</label>
                  <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                </div>
              </div>
              <div className=" py-4 px-4 border-t">
                  <label>Number of Guests</label>
                  <input type="number"value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
              </div>      
            </div>
            <button className="primary mt-4">
                Book this place
                {numberOfNights > 0 && ( 
                   <span> ${numberOfNights * place.price}</span>
                   )}
            </button>
          </div>
    </div>
  )
}

export default BookingWidget