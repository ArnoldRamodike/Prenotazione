import React from 'react'

const PlaceImg = ({place, index = 0, className = null}) => {
    if (!place.photos?.length) {
        return 'No Photos'
    }
    if (!className) {
        className= 'object-cover';
    }
  return (
    <div>
        {place.photos.length> 0 && (
           <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt="place Photo"/>
        )}
    </div>
  )
}

export default PlaceImg