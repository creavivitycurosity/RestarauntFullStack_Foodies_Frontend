// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const AddItemSeller = () => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [sellerName, setSellerName] = useState('');
//     const [category, setCategory] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [image, setImage] = useState(null);
//     const [quantity, setQuantity] = useState(0); // New state for quantity

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategories = async () => {
//           const token = localStorage.getItem('token');
//           try {
//             const response = await axios.get(`${BASE_URL}/items/get/category`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             setCategories(response.data);
//           } catch (error) {
//             console.error('Error fetching categories:', error);
//           }
//         };

//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//               const decodedToken = jwtDecode(token);
//              let selleremail = decodedToken.sub; // or decodedToken.username, depending on your token structure
//              setSellerName(selleremail)
//               console.log(selleremail);
//             } catch (error) {
//               console.error('Error decoding token:', error);
//               localStorage.removeItem('token'); // Remove the token from local storage
//               localStorage.removeItem('refreshToken'); // Remove the token from local storage

//             }
//           }

//         fetchCategories();
//       }, []);



//       const handleAddItem = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('price', price);
//         formData.append('category', category); // Sending category ID
//         formData.append('sellerName', sellerName);
//         formData.append('image', image);
//         formData.append('quantity', quantity);
//         const token = localStorage.getItem('token');

//         try {
//           await axios.post(`${BASE_URL}/items/seller/addnew`, formData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,

//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           navigate('/seller/sellerhome');
//         } catch (error) {
//           console.error('Error adding item:', error);
//         }
//       };

//       return (
//         <div className="add-item-container1">
//           <h1>Add New Item</h1>
//           <form onSubmit={handleAddItem} className="add-item-form1">
//             <div className="form-group1">
//               <label>Name:</label>
//               <input type="text" className="form-control1" value={name} onChange={(e) => setName(e.target.value)} />
//             </div>
//             <div className="form-group1">
//               <label>Price:</label>
//               <input type="number" className="form-control1" value={price} onChange={(e) => setPrice(e.target.value)} />
//             </div>
//             <div className="form-group1">
//               <label>Category:</label>
//               <select className="form-control1" value={category} onChange={(e) => setCategory(e.target.value)}>
//                 <option value="">Select a category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>{cat.name}</option> // Using category ID as value
//                 ))}
//               </select>
//             </div>
//             <div className="form-group1">
//               <label>Seller Name:</label>
//               <input type="text" className="form-control1" value={sellerName} onChange={(e) => setSellerName(e.target.value)} readOnly/>
//             </div>
//             <div className="form-group1">
//               <label>Image:</label>
//               <input type="file" className="form-control1" onChange={(e) => setImage(e.target.files[0])} />
//             </div>

//             <div className="form-group1">
//     <label>Quantity:</label>
//     <input type="number" className="form-control1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
// </div>;

//             <button type="submit" className="submit-button1">Add Item</button>
//           </form>
//         </div>
//       );
//     }


// export default AddItemSeller

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddItem.css"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddItemSeller = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState(''); // New state for description
  const [tags, setTags] = useState([]); // New state for tags
  const [tagInput, setTagInput] = useState(''); // State to capture tag input
  const [isVeg, setIsVeg] = useState(false); // New state for Veg/Non-Veg

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/items/get/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        let selleremail = decodedToken.sub; // or decodedToken.username, depending on your token structure
        setSellerName(selleremail)
        console.log(selleremail);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('refreshToken'); // Remove the token from local storage
      }
    }

    fetchCategories();
  }, []);

    // Function to add a new tag
    const addTag = () => {
      if (tagInput.trim() !== '') {
          setTags([...tags, tagInput.trim()]);  // Add new tag
          setTagInput('');  // Clear input field
      }
  };

  // Function to add tags when "Enter" is pressed
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      e.preventDefault();
    }
  };

  // Function to remove a tag
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };



  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category); // Sending category ID
    formData.append('sellerName', sellerName);
    formData.append('image', image);
    formData.append('quantity', quantity);
    formData.append('description', description); // Sending description
    formData.append('tags', tags); // Append tags
    formData.append('isVeg', isVeg);  // Append the isVeg value

    const token = localStorage.getItem('token');

    try {
      await axios.post(`${BASE_URL}/items/seller/addnew`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/seller/sellerhome');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-container1">
      <h1>Add New Item</h1>
      <form onSubmit={handleAddItem} className="add-item-form1">
        <div className="form-group1">
          <label>Name:</label>
          <input required  type="text" className="form-control1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group1">
          <label>Price:</label>
          <input  min="0"  required  type="number" className="form-control1" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group1">
          <label>Category:</label>
          <select required  className="form-control1" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group1">
          <label>Seller Name:</label>
          <input required  type="text" className="form-control1" value={sellerName} onChange={(e) => setSellerName(e.target.value)} readOnly />
        </div>
        <div className="form-group1">
          <label>Image:</label>
          <input required  type="file" className="form-control1" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="form-group1">
          <label>Quantity:</label>
          <input  min="0"  required  type="number" className="form-control1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
          {/* Veg/Non-Veg Checkbox */}
        <div className="form-group12">
          <label>
          <h4>Is It A Veg Item?</h4>
            <input
            style={{height:"1.5rem",width:"2rem"}}
             
              type="checkbox"
              checked={isVeg}
              onChange={(e) => setIsVeg(e.target.checked)}
            />
          </label>
        </div>
        <div className="form-group1">
          <label>Description:</label>
          <textarea required  className="form-control1" value={description} onChange={(e) => setDescription(e.target.value)} maxLength="250" />
          {description && (
            <h5>{250 - description.length} characters remaining</h5>
          )}
        </div>

        <div className="form-group1">
          <label>Tags:</label>
          <input
            type="text"
            className="form-control1"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder="Press Enter to add a tag"
          />
             <button
                        type="button"
                        className="add-tag-button"
                        onClick={addTag}  // Add tag on button click
                    >
                        Add Tag
                    </button>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <h2 style={{marginTop:"14px"}} onClick={() => removeTag(index)}>x</h2>
              </div>
            ))}
          </div>
        </div>


        <button type="submit" className="submit-button1">Add Item</button>
      </form>



      {/* <style jsx>{`
                .add-item-container1 {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .form-group1 {
                    margin-bottom: 15px;
                }

                .form-control1 {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    transition: border-color 0.3s;
                }

                .form-control1:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .add-tag-button {
                    padding: 8px 12px;
                    margin-left: 10px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .add-tag-button:hover {
                    background-color: #218838;
                }

                .tags-container {
                    margin-top: 10px;
                    display: flex;
                    flex-wrap: wrap;
                }

                .tag {
                    background-color: #e2e6ea;
                    border-radius: 20px;
                    padding: 5px 10px;
                    margin-right: 5px;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                }

                .tag h2 {
                    margin-left: 8px;
                    margin-top:10px
                    cursor: pointer;
                    color: #dc3545;
                }

                .tag h2:hover {
                    color: #c82333;
                }

                .submit-button1 {
                    padding: 10px 15px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .submit-button1:hover {
                    background-color: #0056b3;
                }
            `}</style>

 */}


    </div>
  );
};

export default AddItemSeller;
