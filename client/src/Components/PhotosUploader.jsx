import axios from 'axios';
import { useState } from 'react'

const PhotosUploader = ({addedPhotos, onChange}) => {

    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link',{link: photoLink});
        onChange(prev => {
          return [...prev, filename]
        });
        setPhotoLink('');
      }
  
      function uploadPhoto(ev)
      {
        const files = ev.target.files;
        const data = new FormData();
        data.set('photos', files);
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
          
        }
        axios.post('/upload', data, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
          const {data: filenames} = response;
          onChange(prev => {
            return [...prev, ...filenames]
          });
        })
      }
  
  return (
    <div>
      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">Catchy ones mate</p>
      <div className="flex">
        <input type="text" placeholder={'Add using link ...jpg'} value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 gap-2 rounded-2xl ">Grab &nbsp; photo</button>
      </div>
             
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 && addedPhotos.map(photo => (
          <div className="h-32 flex" key={photo}>
              <img className="rounded-2xl w-full object-cover " src={`http://localhost:4000/uploads/${photo}`} alt="Place photo" />
          </div>
        ))}
         <label className="h-32 bg-transparent border rounded-2xl p-2 mt-4 flex justify-center gap-1 items-center cursor-pointer">
          <input type="file" className="hidden" multiple onChange={uploadPhoto}/>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
            Upload
         </label>
      </div>  
    </div>
  )
}

export default PhotosUploader