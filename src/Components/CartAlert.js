import React, { useEffect, useRef } from 'react';
import './CartAlert.css';

const CartAlert = ({ show, itemName, onClose,name }) => {
    const alertRef = useRef();

    // Automatically close the alert after 3 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [show, onClose]);

    // Close the alert if the user clicks outside the alert box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (alertRef.current && !alertRef.current.contains(event.target)) {
                onClose(); // Dismiss the alert
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup on unmount
        };
    }, [show, onClose]);
    const uppercaseItemName = itemName.toUpperCase();

    return (
        <>
            {show && (
                <div ref={alertRef} className="cart-alert">
                    <h4 color='white'>{uppercaseItemName} {name} </h4>
                </div>
            )}
        </>
    );
};

export default CartAlert;
