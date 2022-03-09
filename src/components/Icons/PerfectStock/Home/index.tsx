import React from 'react';

interface Props {
  fill?: string;
}

const HomeIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17.778" viewBox="0 0 20 17.778">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M16.667,3.333H3.333V8.889H6.839a.277.277,0,0,1,.248.153l.691,1.382L9.5,6.974a.556.556,0,0,1,.994,0l.958,1.915h2.434a.556.556,0,0,1,0,1.111H10.768L10,8.465,8.275,11.915a.556.556,0,0,1-.994,0L6.323,10H3.333v4.444H16.667ZM18.333,0H1.667A1.667,1.667,0,0,0,0,1.667V16.111a1.667,1.667,0,0,0,1.667,1.667H18.333A1.667,1.667,0,0,0,20,16.111V1.667A1.667,1.667,0,0,0,18.333,0Zm-.556,15.556H2.222V2.222H17.778Z"
      />
    </svg>
  );
};

export default HomeIcon;
