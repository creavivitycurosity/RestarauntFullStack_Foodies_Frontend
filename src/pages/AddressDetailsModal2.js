import React from 'react';
import styles from './AddressDetailsModal2.module.css';

const AddressDetailsModal2 = ({ address, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Address Details</h2>
        <p><strong>Area:</strong> {address.area}</p>
        <p><strong>Street:</strong> {address.street}</p>
        <p><strong>City:</strong> {address.city}</p>
        <p><strong>State:</strong> {address.state}</p>
        <p><strong>Country:</strong> {address.country}</p>
        <p><strong>Pincode:</strong> {address.pincode}</p>
        <p><strong>Nearby Location:</strong> {address.nearbyLocation}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddressDetailsModal2;
