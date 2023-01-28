/* eslint-disable max-len */
import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const FourSquare: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14.377 20">
      <path
        id="foursquare"
        d="M12.622,3H1.949A1.811,1.811,0,0,0,0,4.8V21.748a1.158,1.158,0,0,0,.711,1.176A1.2,1.2,0,0,0,2,22.646c5.036-5.837,5.122-5.934,5.122-5.934.121-.133.133-.121.266-.121h3.258a1.653,1.653,0,0,0,1.731-1.551l1.9-9.493C14.6,3.891,14.185,3,12.622,3Zm-.637,2.883L11.54,8.215a.735.735,0,0,1-.66.516H6.723a.766.766,0,0,0-.8.793v.508a.776.776,0,0,0,.8.8h3.532a.629.629,0,0,1,.578.711c-.07.348-.41,2.1-.445,2.3a.7.7,0,0,1-.66.527H6.856a1.054,1.054,0,0,0-1.035.492s-.348.445-3.5,4.231c-.035.035-.07.023-.07-.012V5.848A.67.67,0,0,1,2.9,5.2h8.556a.553.553,0,0,1,.527.684Z"
        transform="translate(0 -3)"
        fill={fill}
      />
    </svg>
  );
};

export default FourSquare;
