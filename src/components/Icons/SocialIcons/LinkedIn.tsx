import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const LinkedIn: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0v40h40V0H0zm13.333 31.667h-5V13.333h5v18.334zm-2.5-20.447c-1.61 
				0-2.916-1.317-2.916-2.94s1.306-2.94 2.916-2.94c1.61 0 2.917 1.317 2.917 
				2.94s-1.305 2.94-2.917 2.94zm22.5 20.447h-5v-9.34c0-5.614-6.666-5.189-6.666 
				0v9.34h-5V13.333h5v2.942c2.328-4.31 11.666-4.628 11.666 4.127v11.265z"
        fill={fill}
      />
    </svg>
  );
};

export default LinkedIn;
