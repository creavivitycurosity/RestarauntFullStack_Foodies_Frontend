import React from 'react';
import styles from './AddressSummary.module.css';
import { useNavigate } from 'react-router-dom';

const AddressSummary = ({ address, onUpdate, onDelete , onView }) => {

  const navigate = useNavigate();

  const handleView = () => {
    if (onView) {
      onView(address.id); // Call onView prop with address ID
    } else {
      // Fallback to navigating to an address view page if onView is not provided
      navigate(`/address-view/${address.id}`);
    }
  };

  return (
    <div className={styles.addressSummary}>
      <p>
        <strong>Area:</strong> {address.area}, <strong>Street:</strong> {address.street}
      </p>
      <p>
        <strong>City:</strong> {address.city}, <strong>State:</strong> {address.state}
      </p>
      <button onClick={onUpdate}>Update</button>
      {/* <button style={{backgroundColor:"crimson"}} onClick={onDelete}>Delete</button> */}
      {/* <button style={{backgroundColor:"lime"}} onClick={() => navigate('/adress-view')}>View</button> */}
      <button style={{ backgroundColor: "lime" }} onClick={handleView}>View</button>

    </div>
  );
};

export default AddressSummary;
