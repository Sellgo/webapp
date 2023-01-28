import React from 'react';
import { Link } from 'react-router-dom';
// import { Card, Image } from 'semantic-ui-react';

// Styles
import styles from './index.module.scss';

// Components
import Facebook from '../Icons/SocialIcons/Facebook';
import Instagram from '../Icons/SocialIcons/Instagram';
import LinkedIn from '../Icons/SocialIcons/LinkedIn';
import Youtube from '../Icons/SocialIcons/Youtube';
import TwitterLogo from '../Icons/SocialIcons/Twitter';
import CrunchBase from '../Icons/SocialIcons/CrunchBase';
import AngelList from '../Icons/SocialIcons/AngelList';
import Meetup from '../Icons/SocialIcons/Meetup';
import FourSquare from '../Icons/SocialIcons/FourSquare';
import Klout from '../Icons/SocialIcons/Klout';
import Pinterest from '../Icons/SocialIcons/Pinterest';
import Amazon from '../Icons/SocialIcons/Amazon';

interface Props {
  site: string;
  link?: string;
  color: string;
  disabled?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const SocialLinkIcon = (props: Props) => {
  const { site, link, color, disabled, width, height, className } = props;
  const linkComponent: { [key: string]: any } = {
    facebook: (
      <Facebook width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    instagram: (
      <Instagram width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : ''} />
    ),
    linkedin: (
      <LinkedIn width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    youtube: (
      <Youtube width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    twitter: (
      <TwitterLogo width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    cruchbase: (
      <CrunchBase width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    angellist: (
      <AngelList width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    meetup: (
      <Meetup width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    foursquare: (
      <FourSquare width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    klout: <Klout width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />,
    pinterest: (
      <Pinterest width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
    amazon: (
      <Amazon width={width ?? 20} height={height ?? 20} fill={disabled ? '#9A9A9A' : color} />
    ),
  };

  return (
    <>
      {linkComponent[site] && (
        <Link
          to={disabled ? '' : { pathname: link }}
          target="_blank"
          className={`${className} ${disabled && styles.disableLink}`}
        >
          {linkComponent[site]}
        </Link>
      )}
    </>
  );
};

export default SocialLinkIcon;
