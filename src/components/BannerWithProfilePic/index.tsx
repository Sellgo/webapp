import React from 'react';
import { Image } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';
import BannerTempIng from '../../assets/images/bannerTempImg.png';

interface Props {
  bannerPicUrl: string;
  profilePicUrl: string;
}
const BannerWithProfilePic = (props: Props) => {
  const { bannerPicUrl, profilePicUrl } = props;
  console.log(bannerPicUrl);
  return (
    <>
      <Image src={BannerTempIng} />
      <div className={styles.profilePicBox}>
        <Image src={profilePicUrl} className={styles.profilePic} />
      </div>
    </>
  );
};

export default BannerWithProfilePic;
