import React from 'react';

interface Props {
  width: number;
  height: number;
  fill: string;
}

const NewLink: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d="M12 .5v2.666a.5.5 0 01-.854.354l-.746-.744-5.071 5.073a.5.5 0 01-.707 0l-.471-.471a.5.5 
				0 010-.707L9.224 1.6 8.48.854A.5.5 0 018.834 0H11.5a.5.5 0 01.5.5zM8.48 5.642l-.333.333A.5.5 0 
				008 6.328v3H1.333V2.667h5.5a.5.5 0 00.354-.146l.333-.333a.5.5 0 00-.354-.854H1a1 1 0 00-1 1v7.333a1 
				1 0 001 1h7.333a1 1 0 001-1V6a.5.5 0 00-.853-.358z"
        fill={fill}
      />
    </svg>
  );
};

export default NewLink;
