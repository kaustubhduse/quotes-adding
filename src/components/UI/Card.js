import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <div className="avatar"></div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Card;
