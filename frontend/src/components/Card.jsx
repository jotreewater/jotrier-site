import React from 'react';
import './Card.css';

const Card = ({
  children,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  title = 'Card Title',
  titleColor = 'hsl(0, 70%, 50%)',
}) => {
  const cardStyle = {
    backgroundColor,
    color: textColor,
  };

  return (
    <div className="card" style={cardStyle}>
      <h2
        style={{
          color: titleColor,
          borderBottom: `2px solid ${titleColor}`,
          marginBottom: '1rem',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Card;
