import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

/* Styling */
import styles from './index.module.scss';

interface Props {
  type: 'primary' | 'secondary' | 'grey' | 'white' | 'blue';
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

  const baseClassName = styles.ctabutton;
  const sizeClassName = classNames(
    { [styles.ctabutton__small]: size === 'small' },
    { [styles.ctabutton__medium]: size === 'medium' },
    { [styles.ctabutton__large]: size === 'large' }
  );
  const typeClassName = classNames(
    { [styles.ctabutton__primary]: type === 'primary' },
    { [styles.ctabutton__secondary]: type === 'secondary' },
    { [styles.ctabutton__grey]: type === 'grey' },
    { [styles.ctabutton__white]: type === 'white' },
    { [styles.ctabutton__blue]: type === 'blue' }
  );

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
      <button
        onClick={onClick}
        className={`${baseClassName} ${typeClassName} ${sizeClassName} ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default OrangeButton;
