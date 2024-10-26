

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RefundPrigressSeller = () => {
//   const { itemId } = useParams();
//   const [item, setItem] = useState(null);
//   const [refundStatus, setRefundStatus] = useState(0); // 0 for order cancelled, 1 for refund initiated, 2 for money sent to bank, etc.
//   const [isLoading, setIsLoading] = useState(true);
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   // Convert ArrayBuffer to Base64 for image display
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   // Fetch item details
//   const fetchItemDetails = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${BASE_URL}/items/${itemId}`);
//       const itemData = response.data;

//       // Fetch item image
//       const imageResponse = await axios.get(`${BASE_URL}/items/images/${itemId}`, {
//         responseType: 'arraybuffer',
//       });
//       const base64String = await arrayBufferToBase64(imageResponse.data);

//       const itemWithImage = {
//         ...itemData,
//         image: `data:image/png;base64,${base64String}`,
//       };

//       setItem(itemWithImage);
//     } catch (error) {
//       console.error('Error fetching item details:', error);
//     }
//   };

//   // Simulating refund progress updates (You can replace this with actual API call logic)
//   const simulateRefundProgress = () => {
//     // Mock progression through refund stages
//     let progress = 0;
//     const interval = setInterval(() => {
//       if (progress < 3) {
//         setRefundStatus(progress);
//         progress++;
//       } else {
//         clearInterval(interval); // Stop after all steps are completed
//       }
//     }, 2000); // Update every 2 seconds for demonstration purposes
//   };

//   useEffect(() => {
//     fetchItemDetails();
//     simulateRefundProgress(); // Start the refund progress simulation
//   }, [itemId]);

//   useEffect(() => {
//     if (item) {
//       setIsLoading(false); // Hide loader after fetching item details
//     }
//   }, [item]);

//   if (isLoading) {
//     return <p>Loading item and refund status...</p>;
//   }

//   if (!item) {
//     return <p>No item found.</p>;
//   }

//   // Render refund progress steps
//   const renderRefundProgress = () => {
//     const stages = [
//       'Order Cancelled',
//       'Refund Initiated',
//       'Money Sent to Bank',
//       'Refund Completed',
//     ];

//     return (
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         {stages.map((stage, index) => (
//           <div
//             key={index}
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               width: '20%',
//             }}
//           >
//             {/* Circle indicating the status */}
//             <div
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 backgroundColor: refundStatus >= index ? '#4CAF50' : '#ddd',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontSize: '14px',
//                 color: refundStatus >= index ? '#fff' : '#000',
//               }}
//             >
//               {index + 1}
//             </div>
//             {/* Label for each stage */}
//             <p style={{ marginTop: '10px', textAlign: 'center' }}>{stage}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
//       <div style={{ maxWidth: '400px', margin: '0 auto', overflow: 'hidden' }}>
//         <img
//           src={item.image}
//           alt={item.name}
//           style={{
//             width: '100%',
//             height: 'auto',
//             maxHeight: '200px',
//             objectFit: 'cover',
//             borderRadius: '10px',
//             marginBottom: '20px',
//           }}
//         />
//       </div>
//       <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Price: ${item.price}</p>

//       {/* Refund Progress Section */}
//       <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Refund Progress</h3>
//       {/* Progress Bar */}
//       <div
//         style={{
//           height: '10px',
//           backgroundColor: '#ddd',
//           borderRadius: '5px',
//           overflow: 'hidden',
//           marginTop: '20px',
//         }}
//       >
//         <div
//           style={{
//             width: `${(refundStatus / 3) * 100}%`, // Progress percentage
//             height: '100%',
//             backgroundColor: '#4CAF50',
//             transition: 'width 1s ease-in-out',
//           }}
//         />
//       </div>

//       {/* Refund Stages */}
//       {renderRefundProgress()}
//     </div>
//   );
// };

// export default RefundPrigressSeller;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RefundProgressSeller = () => {
//   const { itemId } = useParams();
//   const [item, setItem] = useState(null);
//   const [refundStatus, setRefundStatus] = useState(''); // Fetch actual refund status from backend
//   const [isLoading, setIsLoading] = useState(true);
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   // Convert ArrayBuffer to Base64 for image display
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   // Fetch item details
//   const fetchItemDetails = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${BASE_URL}/items/${itemId}`);
//       const itemData = response.data;

//       // Fetch item image
//       const imageResponse = await axios.get(`${BASE_URL}/items/images/${itemId}`, {
//         responseType: 'arraybuffer',
//       });
//       const base64String = await arrayBufferToBase64(imageResponse.data);

//       const itemWithImage = {
//         ...itemData,
//         image: `data:image/png;base64,${base64String}`,
//       };
//       setIsLoading(false);

//       setItem(itemWithImage);
//       console.log(itemWithImage)
//     } catch (error) {
//         setIsLoading(false);

//       console.error('Error fetching item details:', error);
//     }
//   };
//   // Fetch refund status
//   const fetchRefundStatus = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/orders/refund-status/${itemId}`);
//       setRefundStatus(response.data);  // Set refund status from API
//     } catch (error) {
//       console.error('Error fetching refund status:', error);
//     }
//   };

//   // Update refund status (for seller)
//   const updateRefundStatus = async (newStatus) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/orders/seller/update-refund-status/${itemId}`, newStatus, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       alert('Refund status updated');
//       setRefundStatus(newStatus);
//     } catch (error) {
//       console.error('Error updating refund status:', error);
//     }
//   };

//   useEffect(() => {
//     fetchItemDetails();
//     fetchRefundStatus();
//   }, [itemId]);

//   if (isLoading || !item) {
//     return <p>Loading item and refund status...</p>;
//   }

//   const renderRefundProgress = () => {
//     const stages = ['Order Cancelled', 'Refund Initiated', 'Money Sent to Bank', 'Refund Completed'];
//     const currentStageIndex = stages.indexOf(refundStatus);

//     return (
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         {stages.map((stage, index) => (
//           <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
//             <div
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 backgroundColor: index <= currentStageIndex ? '#4CAF50' : '#ddd',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontSize: '14px',
//                 color: index <= currentStageIndex ? '#fff' : '#000',
//               }}
//             >
//               {index + 1}
//             </div>
//             <p style={{ marginTop: '10px', textAlign: 'center' }}>{stage}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
//       <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Price: ${item.price}</p>

//       {/* Refund Progress Section */}
//       <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Refund Progress</h3>
//       {renderRefundProgress()}

//       {/* Button to update refund status */}
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <button onClick={() => updateRefundStatus('Refund Initiated')} style={{ marginRight: '10px' }}>Initiate Refund</button>
//         <button onClick={() => updateRefundStatus('Money Sent to Bank')} style={{ marginRight: '10px' }}>Send to Bank</button>
//         <button onClick={() => updateRefundStatus('Refund Completed')}>Complete Refund</button>
//       </div>
//     </div>
//   );
// };

// export default RefundProgressSeller;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RefundProgressSeller = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [refundStatus, setRefundStatus] = useState('Order Cancelled'); // Default to "Order Cancelled"
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch item details
  const fetchItemDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/items/${itemId}`);
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setIsLoading(false);
    }
  };

  // Fetch refund status
  const fetchRefundStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/refund-status/${itemId}`);
      setRefundStatus(response.data);
    } catch (error) {
      console.error('Error fetching refund status:', error);
    }
  };

  // Update refund status (for seller)
  const updateRefundStatus = async (newStatus) => {
    try {
      await axios.put(`${BASE_URL}/orders/seller/update-refund-status/${itemId}`, newStatus, {
        headers: { 'Content-Type': 'application/json' }
      });
      setRefundStatus(newStatus);
    } catch (error) {
      console.error('Error updating refund status:', error);
    }
  };

  useEffect(() => {
    fetchItemDetails();
    fetchRefundStatus();
  }, [itemId]);

  if (isLoading || !item) {
    return <p>Loading item and refund status...</p>;
  }

  const renderRefundProgress = () => {
    const stages = ['Order Cancelled', 'Refund Initiated', 'Money Sent to Bank', 'Refund Completed'];
    const currentStageIndex = stages.indexOf(refundStatus);
    const currentIndex = currentStageIndex >= 0 ? currentStageIndex : 0;

    return (
      <div style={{ marginTop: '30px' }}>
        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#ddd',
            height: '10px',
            borderRadius: '5px',
            overflow: 'hidden',
            marginBottom: '10px',

          }}
        >
          <div
            style={{
              width: `${(currentIndex / (stages.length - 1)) * 100}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>

        {/* Stage Names */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          {stages.map((stage, index) => (
            <div key={index} style={{ textAlign: 'center', width: '20%' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: index <= currentIndex ? '#4CAF50' : '#ddd',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                  fontSize: '14px',
                  color: index <= currentIndex ? '#fff' : '#000',
                }}
              >
                {index + 1}
              </div>
              <p style={{ marginTop: '5px', fontSize: '12px', color: index <= currentIndex ? '#4CAF50' : '#000' }}>
                {stage}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
      <div
      style={{
        maxWidth: '500px',
        height: 'auto',
        maxHeight: '200px',
        overflow: "hidden",
        borderRadius: '10px',
        margin: '0 auto', // Centering the container
        display: 'flex', // Use flexbox for centering
        justifyContent: 'center', // Center child items horizontally
        alignItems: 'center', // Center child items vertically
        marginBottom:"20px",

      }}
    >
      <img
        src={`data:image/png;base64,${item.image}`} // Convert image to base64 here
        alt={item.name}
        style={{
          maxWidth: '100%', // Ensure image doesn't overflow the container
          maxHeight: '100%', // Ensure image doesn't overflow the container
          borderRadius: '10px',
        }}
      />
    </div>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Price: ${item.price}</p><br/>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Refund Amount: ${item.price}</p>

      {/* Refund Progress Section */}
      <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Refund Progress</h3>
      {renderRefundProgress()}

      {/* Button to update refund status */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => updateRefundStatus('Refund Initiated')} style={{ marginRight: '10px' }}>Initiate Refund</button>
        <button onClick={() => updateRefundStatus('Money Sent to Bank')} style={{ marginRight: '10px' }}>Send to Bank</button>
        <button onClick={() => updateRefundStatus('Refund Completed')}>Complete Refund</button>
      </div>
    </div>
  );
};

export default RefundProgressSeller;
