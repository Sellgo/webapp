import React from 'react';

import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import { SOCIAL_LINK_COLORS } from '../../../constants/SellerResearch/SellerDatabase';
import SocialLinkIcon from '../../../components/SocialLinkIcon';
import ActionButton from '../../../components/ActionButton';
/* Containers */

interface Props {
  name: string;
  position: string;
  socialPlatformName: string;
  socialProfileLink: string;
  numOfEmails: number;
  numOfPhones: number;
  isDisabled: boolean;
  isLookedUp?: boolean;
  onNameClick?: () => void;
  onCtaClick: () => void;
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
    isLookedUp,
    onNameClick,
    onCtaClick,
  } = props;

  return (
    <div className={styles.employeeBox}>
      {/* <Image
        size="mini"
        src={require(`../../../assets/images/avatarPlaceholder.svg`)}
        className={styles.employeeInformationDetails__card__description__image}
      /> */}
      <p className={styles.name} onClick={onNameClick}>
        {name}
      </p>
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
      <ActionButton
        variant="primary"
        type={isLookedUp ? 'black' : 'purpleGradient'}
        size="small"
        // loading={activeEmployeeIndex === index && isUnlocking}
        onClick={() => {
          onCtaClick();
        }}
        className={styles.btn}
      >
        {isLookedUp ? 'View' : 'Unlock'}
      </ActionButton>
    </div>
  );
};

export default EmployeeBox;
