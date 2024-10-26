// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import styles from './UserProfile.module.css'; // Import the CSS module

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           const email = decodedToken.sub; // Assuming the email is stored in 'sub'
//           const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data);
//           console.log(response.data)
//           setLoading(false);
//         } catch (err) {
//           console.error('Error fetching user data:', err);
//           setError('Unable to fetch user data.');
//           setLoading(false);
//         }
//       } else {
//         setError('No token found, please log in.');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [BASE_URL]);

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

//   return (
//     <div className={styles.userProfileContainer}>
//       <h1>User Profile</h1>
//       {user && (
//         <div className={styles.userInfo}>
//           <img 
//             src={`data:image/jpeg;base64,${user.image}`}

//             alt="User"
//             className={styles.userImage}
//           />
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>ADDRESS:</strong> {user.address}</p>

//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useState, useEffect } from 'react';  //working
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import styles from './UserProfile.module.css'; // Import the CSS module

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           const email = decodedToken.sub; // Assuming the email is stored in 'sub'
//           const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data);
//           setLoading(false);
//         } catch (err) {
//           console.error('Error fetching user data:', err);
//           setError('Unable to fetch user data.');
//           setLoading(false);
//         }
//       } else {
//         setError('No token found, please log in.');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [BASE_URL]);

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleImageUpload = async () => {
//     const token = localStorage.getItem('token');
//     if (selectedImage && token) {
//       const formData = new FormData();
//       formData.append('image', selectedImage);

//       // Add email to form data
//       const email = jwtDecode(token).sub;
//       formData.append('email', email);

//       try {
//         await axios.post(`${BASE_URL}/api/users/upload-image`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         // Refresh user data after upload
//         const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(response.data);
//       } catch (err) {
//         console.error('Error uploading image:', err);
//         setError('Unable to upload image.');
//       }
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

//   return (
//     <div className={styles.userProfileContainer}>
//       <h1>User Profile</h1>
//       {user && (
//         <div className={styles.userInfo}>
//           {user.image ? (
//             <img
//               src={`data:image/jpeg;base64,${user.image}`}
//               alt="User"
//               className={styles.userImage}
//             />
//           ) : (
//             <div className={styles.uploadContainer}>
//               <h2>no profile picture</h2>
//               <input type="file" accept="image/*" onChange={handleImageChange} />
//               <button  onClick={handleImageUpload}>Upload Image</button>
//             </div>
//           )}
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Address:</strong> {user.address}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import styles from './UserProfile.module.css';
import AddressSummary from './AddressSummary'; // Component for displaying addresses
import AddressForm from './AddressForm'; // Form for adding/updating addresses
import AddressDetailsModal2 from './AddressDetailsModal2'; // New modal component for viewing address details

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false); // Toggle address form visibility
  const [isEditingAddress, setIsEditingAddress] = useState(null); // Track the address being edited
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewAddress, setViewAddress] = useState(null); // State for the address being viewed

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch user and address data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      // Decode JWT token to extract email
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub;

      try {
        const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Set the user data in state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Unable to fetch user data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [BASE_URL]);

  // Handle add address button
  const handleAddAddress = () => {
    setIsAddingAddress(true); // Show the form for adding a new address
  };

  const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem('token');
    setError(null); // Reset error state before the operation
    try {
      // Remove address from the state immediately
      setUser((prevUser) => ({
        ...prevUser,
        addresses: prevUser.addresses.filter(address => address.id !== addressId)
      }));

      // Attempt to delete the address
      await axios.delete(`${BASE_URL}/api/users/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optionally, you could refetch the user data if you have other dependencies
      // const response = await axios.get(`${BASE_URL}/api/users/me`, {
      //     headers: {
      //         Authorization: `Bearer ${token}`,
      //     },
      // });
      // setUser(response.data); // Update user state with fresh data
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Unable to delete address.'); // Set error message only on failure
    }
  };


  // Handle update address (show update form)
  const handleUpdateAddress = (addressId) => {
    setIsEditingAddress(addressId); // Set the ID of the address being edited
    setIsAddingAddress(false); // Hide add address form if editing
  };

  // Handle successful add/update of an address
  const handleAddressSuccess = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub;

    try {
      const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Refresh the user data
      setIsAddingAddress(false); // Hide the add form
      setIsEditingAddress(null); // Reset editing mode
    } catch (err) {
      console.error('Error fetching updated user data:', err);
      setError('Unable to refresh user data.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;



  // Handle image change
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle image upload
  const handleImageUpload = async () => {
    const token = localStorage.getItem('token');
    if (selectedImage && token) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Add email to form data
      const email = jwtDecode(token).sub;
      formData.append('email', email);

      try {
        await axios.post(`${BASE_URL}/api/users/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        // Refresh user data after upload
        const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error uploading image:', err);
        setError('Unable to upload image.');
      }
    }
  };


  // Handle view address details
  const handleViewAddress = async (addressId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/api/users/user/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViewAddress(response.data); // Set the address data to be displayed in the modal
    } catch (err) {
      console.error('Error fetching address details:', err);
      setError('Unable to fetch address details.');
    }
  };

  const handleCloseModal = () => {
    setViewAddress(null); // Close the modal
  };


  return (
    <div className={styles.userProfileContainer}>
      <h1>User Profile</h1>
      {user && (
        <div className={styles.userInfo}>
          {user.image ? (
            <img
              src={`data:image/jpeg;base64,${user.image}`}
              alt="User"
              className={styles.userImage}
            />
          ) : (
            <div className={styles.uploadContainer}>
              <h2>No profile picture</h2>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={handleImageUpload}>Upload Image</button>
            </div>
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Address Summary:</strong></p>
          {/* Display Address Summary */}
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <AddressSummary
                key={address.id}
                address={address}
                onDelete={() => handleDeleteAddress(address.id)}
                onUpdate={() => handleUpdateAddress(address.id)}
                onView={handleViewAddress} // Pass view handler to AddressSummary

              />
            ))
          ) : (
            <p>No addresses available.</p>
          )}

          {/* Add Address Button */}
          <button style={{ backgroundColor: "blue", color: "white" }} className={styles.addAddressButton} onClick={handleAddAddress}>
            Add Another Address
          </button>

          {/* Conditionally Render Add/Edit Address Form */}
          {isAddingAddress && (
            <AddressForm
              userId={user.id}
              onSuccess={handleAddressSuccess}
              onCancel={() => setIsAddingAddress(false)}
            />
          )}

          {isEditingAddress && (
            <AddressForm
              userId={user.id}
              addressId={isEditingAddress}
              onSuccess={handleAddressSuccess}
              onCancel={() => setIsEditingAddress(null)}
            />
          )}


          {/* Modal for viewing address details */}
          {viewAddress && (
            <AddressDetailsModal2
              address={viewAddress}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
