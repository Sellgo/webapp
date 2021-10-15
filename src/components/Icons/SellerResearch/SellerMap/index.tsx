import React from 'react';

interface Props {
  fill: string;
}

const SellerMapIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
      <path
        fill={fill || '#fff'}
        /* eslint-disable-next-line max-len */
        d="M12.5,8A12.5,12.5,0,1,0,25,20.5,12.5,12.5,0,0,0,12.5,8Zm-1.613,2.56v.57a.807.807,0,0,1-1.169.721l-1.21-.6A10.176,10.176,0,0,1,10.887,10.56ZM12.5,29.2v1.381a10.067,10.067,0,0,1-9.194-14.2c.5.741,1.27,1.885,1.744,2.576A5.625,5.625,0,0,0,5.963,20l.04.035a7.35,7.35,0,0,0,1.593,1.1c.706.353,1.734.917,2.46,1.316a1.606,1.606,0,0,1,.832,1.411v1.613a1.61,1.61,0,0,0,.474,1.139A3.783,3.783,0,0,1,12.5,29.2Zm2.152,1.144.877-2.364c.1-.277.166-.565.242-.852a1.218,1.218,0,0,1,.313-.539l.57-.57a2.337,2.337,0,0,0,.691-1.663,1.541,1.541,0,0,0-.449-1.089l-.691-.691a1.61,1.61,0,0,0-1.139-.474H11.694c-.474-.237-1.084-1.613-1.613-1.613a3.422,3.422,0,0,1-1.527-.363l-.559-.277a.608.608,0,0,1-.333-.539.6.6,0,0,1,.413-.57l1.573-.524a.8.8,0,0,1,.781.156l.469.408a.4.4,0,0,0,.262.1h.282A.405.405,0,0,0,11.8,18.3l-.786-1.573a.4.4,0,0,1,.081-.469l.5-.484a.4.4,0,0,1,.282-.116h.454a.408.408,0,0,0,.287-.116l.4-.4a.4.4,0,0,0,0-.57l-.237-.237a.4.4,0,0,1,0-.57l.519-.519.237-.237a.809.809,0,0,0,0-1.139L12.117,10.44c.126-.005.252-.02.383-.02A10.084,10.084,0,0,1,21.507,16l-.655.328a1.25,1.25,0,0,0-.464.408L19.4,18.217a1.2,1.2,0,0,0,0,1.341l.907,1.361a1.223,1.223,0,0,0,.711.5l1.472.368A10.1,10.1,0,0,1,14.652,30.344Z"
        transform="translate(0 -8)"
      />
    </svg>
  );
};

export default SellerMapIcon;
