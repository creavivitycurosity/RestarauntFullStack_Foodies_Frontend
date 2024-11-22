// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// function AdminPage() {
//     const [images, setImages] = useState([]);
//     const [maxImages, setMaxImages] = useState(5);
//     const [title, setTitle] = useState('');
//     const [file, setFile] = useState(null);
//     const [speed, setSpeed] = useState(500);

//     useEffect(() => {
//         fetchImages();
//         fetchSettings();
//     }, []);

//     const fetchImages = async () => {
//         const response = await axios.get(`${BASE_URL}/api/images`);
//         setImages(response.data);
//     };

//     const fetchSettings = async () => {
//         const response = await axios.get(`${BASE_URL}/api/images/settings`);
//         setMaxImages(response.data.maxImages);
//         setSpeed(response.data.speed);

//     };

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleAddImage = async () => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('title', title);

//         await axios.post(`${BASE_URL}/api/images/upload`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setImages([])
//         setTitle('')
//         fetchImages();
//     };

//     const handleDeleteImage = async (id) => {
//         await axios.delete(`${BASE_URL}/api/images/${id}`);
//         fetchImages();
//     };

//     // In AdminPage.js or wherever you are updating maxImages
//     const handleMaxImagesChange = async (value) => {
//         await axios.put(`${BASE_URL}/api/images/settings`, { maxImages: value });
//         setMaxImages(value);
//     };
//     const handleSpeedChange = async (value) => {
//         setSpeed(value);
//         await axios.put(`${BASE_URL}/api/images/settings`, { maxImages, speed: value });
//     };

//     return (
//         <div>
//             <h2>Admin Panel</h2>
//             <div>
//                 <h3>Slider Settings</h3>
//                 <label>Max Images in Slider:</label>
//                 <input
//                     type="number"
//                     value={maxImages}
//                     onChange={(e) => handleMaxImagesChange(e.target.value)}
//                 />

//                 <label>Slider Speed (ms):</label>
//                 <input
//                     type="number"
//                     value={speed}
//                     onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
//                 />
//             </div>
//             <div>
//                 <h3>Upload New Image</h3>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <input
//                     type="file"
//                     onChange={handleFileChange}
//                 />
//                 <button onClick={handleAddImage}>Upload</button>
//             </div>
//             <div>
//                 <h3>Image Previews</h3>
//                 {images.map((image) => (
//                     <div key={image.id}>
//                         <img src={`data:image/jpeg;base64,${image.imageData}`} alt={image.title} />

//                         {/* <p>{image.title}</p> */}
//                         <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default AdminPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Previewslider from './Previewslider';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminPage() {
    const [images, setImages] = useState([]);
    const [maxImages, setMaxImages] = useState(5);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [speed, setSpeed] = useState(500);

    useEffect(() => {
        fetchImages();
        fetchSettings();
    }, []);

    const fetchImages = async () => {
        const response = await axios.get(`${BASE_URL}/api/images`);
        setImages(response.data);
    };

    const fetchSettings = async () => {
        const response = await axios.get(`${BASE_URL}/api/images/settings`);
        setMaxImages(response.data.maxImages);
        setSpeed(response.data.speed);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddImage = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        await axios.post(`${BASE_URL}/api/images/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        fetchImages();
        window.alert("successfully added, please refresh to view its preview")

        // Force refresh the page
        window.location.reload();
    };

    const handleDeleteImage = async (id) => {
        await axios.delete(`${BASE_URL}/api/images/${id}`);
        fetchImages();
    };

    // Update maxImages
    const handleMaxImagesChange = (value) => {
        setMaxImages(value);
    };

    const updateMaxImages = async () => {
        await axios.put(`${BASE_URL}/api/images/settings`, { maxImages });
        window.alert("successfully updated please refresh to view its preview")
        // Force refresh the page
        window.location.reload();
    };

    // Update speed
    const handleSpeedChange = (value) => {
        setSpeed(value);
    };

    const updateSpeed = async () => {
        await axios.put(`${BASE_URL}/api/images/settings`, { maxImages, speed });
        window.alert("successfully updated please refresh to view its preview")
        // Force refresh the page
        window.location.reload();
    };

    return (
        <div>
            <hr />
            <h2>Home Page Slider Images</h2>
            <h3>Image Previews</h3>

            <Previewslider />
            <hr />
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <h3>ADD ANOTHER IMAGE</h3><br />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                /><br />
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ paddingTop: "8px" }}
                />
                <br />
                <button onClick={handleAddImage} style={{ backgroundColor: "lightgreen" }}>Upload</button>
            </div>

            <hr />

            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap"}}>
            <h3>SLIDER SETTINGS</h3>
            <br />
                <div  style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                <label>Max Images in Slider:</label>   <br />

                <input
                    type="number"
                    value={maxImages}
                    onChange={(e) => handleMaxImagesChange(e.target.value)}
                    min="0" // Prevent negative values

                /><br />
                <button onClick={updateMaxImages} style={{ backgroundColor: "lightgreen" }}>Update Max Images</button>
                <br/>
                </div>
                <br />
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                <label>Slider Speed (ms):</label><br />
                <input
                    type="number"
                    value={speed}
                    onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
                    min="0" // Prevent negative values

                /><br />
                <button onClick={updateSpeed} style={{ backgroundColor: "lightgreen" }}>Update Speed</button>
                </div>
            </div>

            <div>
            </div>
        </div>
    );
}

export default AdminPage;