import React from 'react';

export default function MoreButton({ buttonName, actionNeed }) {
  const handleClick = (event) => {
    console.log('Handle click with button : ', buttonName);
    actionNeed();
  };

  return (
    <div className="container">
      <div onClick={handleClick}>{buttonName}</div>
    </div>
  );
}
