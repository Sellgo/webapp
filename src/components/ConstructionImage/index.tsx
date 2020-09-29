import React from 'react';

import img from '../../assets/images/construction-page.png';

import './index.scss';

const ConstructionImage = () => {
  return (
    <div className="construction-image">
      <img src={img} alt="Illustration showcasing a come back tomorrow message" />
    </div>
  );
};

export default ConstructionImage;
