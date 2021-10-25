import React from 'react';

interface Props {
  fill?: string;
}

const ProductDatabaseIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22.857" viewBox="0 0 22.857 20">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M20,3.265V5.306c0,1.8-4.479,3.265-10,3.265S0,7.1,0,5.306V3.265C0,1.467,4.479,0,10,0S20,1.467,20,3.265Zm0,4.592v4.592c0,1.8-4.479,3.265-10,3.265S0,14.247,0,12.449V7.857c2.148,1.48,6.081,2.168,10,2.168S17.852,9.337,20,7.857ZM20,15v4.592c0,1.8-4.479,3.265-10,3.265S0,21.39,0,19.592V15c2.148,1.48,6.081,2.168,10,2.168S17.852,16.48,20,15Z"
      />
    </svg>
  );
};

export default ProductDatabaseIcon;
