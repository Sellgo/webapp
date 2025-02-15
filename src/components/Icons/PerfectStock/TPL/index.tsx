import React from 'react';

interface Props {
  fill?: string;
}

const TplIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17.778" viewBox="0 0 20 17.778">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M3.333,1.111a1.111,1.111,0,0,1,2.222,0V2.222H10V1.111a1.111,1.111,0,1,1,2.222,0V2.222h1.667a1.667,1.667,0,0,1,1.667,1.667V5.556H0V3.889A1.667,1.667,0,0,1,1.667,2.222H3.333Zm12.222,5.58c-.184-.017-.368-.024-.556-.024a6.111,6.111,0,0,0-3.514,11.111H1.667A1.667,1.667,0,0,1,0,16.111V6.667H15.556ZM20,12.778a5,5,0,1,1-5-5A5,5,0,0,1,20,12.778Zm-5.587-2.222v2.222a.579.579,0,0,0,.556.556h1.7a.556.556,0,1,0,0-1.111H15.524V10.556A.538.538,0,0,0,14.969,10a.579.579,0,0,0-.556.556Z"
      />
    </svg>
  );
};

export default TplIcon;
