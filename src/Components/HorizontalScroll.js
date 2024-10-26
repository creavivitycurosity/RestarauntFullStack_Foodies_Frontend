// import React, { useState } from 'react';
// import './HorizontalScroll.css';

// const items = [
//   'Chicken', 'Mutton', 'Fish', 'Pork', 'Beef',
//   'Shrimp', 'Turkey', 'Lamb', 'Duck', 'Crab'
// ];

// const HorizontalScroll = () => {
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsToShow = 5;

//   const handleScrollLeft = () => {
//     setStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
//   };

//   const handleScrollRight = () => {
//     setStartIndex(prevIndex => Math.min(prevIndex + 1, items.length - itemsToShow));
//   };

//   return (
//     <div className="horizontal-scroll-container">
//       <button className="scroll-button" onClick={handleScrollLeft}>&lt;</button>
//       <div className="buttons-container">
//         {items.slice(startIndex, startIndex + itemsToShow).map((item, index) => (
//           <button key={index} className="item-button">
//             {item}
//           </button>
//         ))}
//       </div>
//       <button className="scroll-button" onClick={handleScrollRight}>&gt;</button>
//     </div>
//   );
// };

// export default HorizontalScroll;

import React, { useState } from 'react';
import './HorizontalScroll.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const items = [
  'Chicken', 'Mutton', 'Fish', 'Pork', 'Beef',
  'Shrimp', 'Turkey', 'Lamb', 'Duck', 'Crab'
];

const HorizontalScroll = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 5;

  const handleScrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (startIndex < items.length - itemsToShow) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div className="horizontal-scroll-container">
      <button 
        className="scroll-button" 
        onClick={handleScrollLeft} 
        disabled={startIndex === 0}
      >
        &lt;
      </button>
      <div className="buttons-container">
        <div 
          className="buttons-slider" 
          style={{ transform: `translateX(-${startIndex * 110}px)` }}
        >
          {items.map((item, index) => (
            <button key={index} className="item-button">
              {item}
            </button>
          ))}
        </div>
      </div>
      <button 
        className="scroll-button" 
        onClick={handleScrollRight} 
        disabled={startIndex >= items.length - itemsToShow}
      >
        &gt;
      </button>
    </div>
  );
};

export default HorizontalScroll;
