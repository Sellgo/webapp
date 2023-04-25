import React from 'react';

import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import { SOCIAL_LINK_COLORS } from '../../../constants/SellerResearch/SellerDatabase';
import SocialLinkIcon from '../../../components/SocialLinkIcon';
/* Containers */

interface Props {
  name: string;
  position: string;
  socialPlatformName: string;
  socialProfileLink: string;
  numOfEmails: number;
  numOfPhones: number;
  isDisabled: boolean;
}

const EmployeeBox = (props: Props) => {
  const {
    name,
    position,
    socialPlatformName,
    socialProfileLink,
    numOfEmails,
    numOfPhones,
    isDisabled,
  } = props;

  return (
    <div className={styles.employeeBox}>
      {/* <Image
        size="mini"
        src={require(`../../../assets/images/avatarPlaceholder.svg`)}
        className={styles.employeeInformationDetails__card__description__image}
      /> */}
      <p className={styles.name}>{name}</p>
      <p className={styles.position}>{position}</p>
      <div>
        <SocialLinkIcon
          site={socialPlatformName}
          link={socialProfileLink}
          color={SOCIAL_LINK_COLORS[socialPlatformName]}
          disabled={isDisabled || socialProfileLink === ''}
          width={14}
          height={14}
          className={styles.socialLink}
        />
        <>
          <Icon name="mail" disabled={isDisabled || numOfEmails === 0} color="grey" />
          <span>{numOfEmails}</span>
        </>
        <>
          {' '}
          <Icon
            flipped="horizontally"
            name="phone"
            disabled={isDisabled || numOfPhones === 0}
            color="grey"
          />
          <span>{numOfPhones}</span>
        </>
      </div>
    </div>
  );
};

export default EmployeeBox;
