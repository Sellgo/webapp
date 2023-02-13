import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const UserRequestIcon: React.FC<Props> = props => {
  const { width, height, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 15}
      height={height ?? 15}
      viewBox="0 0 20 15.556"
    >
      <path
        id="address-card-solid"
        d="M2.222,32A2.224,2.224,0,0,0,0,34.222V45.333a2.224,2.224,0,0,0,2.222,2.222H17.778A2.224,
        2.224,0,0,0,20,45.333V34.222A2.224,2.224,0,0,0,17.778,32ZM5,40.889H7.222A2.777,2.777,0,0,
        1,10,43.667a.557.557,0,0,1-.556.556H2.778a.557.557,0,0,1-.556-.556A2.777,2.777,0,0,1,5,
        40.889Zm3.333-3.333a2.222,2.222,0,1,1-2.222-2.222A2.224,2.224,0,0,1,8.333,
        37.556Zm4.444-1.111h4.444a.556.556,0,0,1,0,1.111H12.778a.556.556,0,0,1,0-1.111Zm0,
        2.222h4.444a.556.556,0,1,1,0,1.111H12.778a.556.556,0,1,1,0-1.111Zm0,2.222h4.444a.556.556,
        0,0,1,0,1.111H12.778a.556.556,0,0,1,0-1.111Z"
        transform="translate(0 -32)"
        fill={fill ?? '#fff'}
      />
    </svg>
  );
};

export default memo(UserRequestIcon);
