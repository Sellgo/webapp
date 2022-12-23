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
  };

  return (
    <Link
      to={disabled ? '' : { pathname: link }}
      target="_blank"
      className={`${className} ${disabled && styles.disableLink}`}
    >
      {linkComponent[site]}
    </Link>
  );
};

export default SocialLinkIcon;
