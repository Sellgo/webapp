import React from 'react';
import { Link } from 'react-router-dom';

/* Styling */
import './index.scss';

interface Props {
  type: 'primary' | 'secondary' | 'grey';
  size: 'small' | 'medium' | 'large';
  navigateTo?: string;
  onClick?: () => any;
  children: React.ReactNode;
  className?: string;
  asExternal?: boolean;
  newTarget?: boolean;
}

const OrangeButton = (props: Props) => {
  const { navigateTo, type, size, children, className, asExternal, newTarget, onClick } = props;

  const baseClassName = `ctabutton`;
  const sizeClassName = `ctabutton--${size}`;
  const typeClassName = `ctabutton--${type}`;

  // render as normal <a> tag
  if (navigateTo && asExternal) {
    return (
      <a
        className={`${baseClassName} ${typeClassName} ${sizeClassName} ${className}`}
        href={navigateTo}
        target={newTarget ? '_blank' : ''}
        rel="noreferrer noopener"
        onClick={onClick}
      >
        {children}
      </a>
    );
  } else if (navigateTo) {
    return (
      <Link to={navigateTo} onClick={onClick}>
        <a
          href={navigateTo}
          className={`${baseClassName} ${typeClassName} ${sizeClassName} ${className}`}
        >
          {children}
        </a>
      </Link>
    );
    // If button is created with a onclick prop only
  } else {
    return (
      <div onClick={onClick}>
        <p className={`${baseClassName} ${typeClassName} ${sizeClassName} ${className}`}>
          {children}
        </p>
      </div>
    );
  }
};

export default OrangeButton;
