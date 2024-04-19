import axios from 'axios';
import { useState } from 'react'

const PhotosUploader = ({addedPhotos, onChange}) => {

    const [photoLink, setPhotoLink] = useState([]);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link',{link: photoLink});
        onChange(prev => {
          if (prev === undefined) {
            prev = [];
          }
          return [...prev, filename]
        });
        setPhotoLink([]);
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
            if (prev === undefined) {
              prev = [];
            }
            return [...prev, ...filenames]
          });
        })
      }

      function removePhoto(ev,filename) {
        ev.preventDefault();
        onchange([...addedPhotos.filter(photo => photo !== filename)]);
      }

      function selectMainPhoto(ev,filename) {
        ev.preventDefault();
        const newAddedPhotos = [filename, ...addedPhotos
          .filter(photo => photo !== filename)];
        onchange(newAddedPhotos);

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
          <div className="h-32 flex relative" key={photo}>
              <img className="rounded-2xl w-full object-cover " src={`http://localhost:4000/uploads/${photo}`} alt="Place photo" />
              <button onClick={(ev) => removePhoto(ev, photo)} className="absolute bottom-1 right-1 text-white bg-black rounded-2xl py-2 px-2 bg-opacity-50 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <button  onClick={(ev) => selectMainPhoto(ev,photo)} className="absolute bottom-1 left-1 text-white bg-black rounded-2xl py-2 px-2 bg-opacity-50 cursor-pointer">
                {photo === addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                )}
                {photo !== addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                
                )}
              </button>
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