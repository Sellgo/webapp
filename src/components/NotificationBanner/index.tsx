import React, { memo, useState } from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
  isOpenByDefault?: boolean;
  className?: string;
  onClick?: () => void;
}

const NotificationBanner = (props: Props) => {
  const { children, isOpenByDefault = false, className, onClick } = props;
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`
        ${styles.notificationBanner}
        ${className}
        ${onClick ? styles.notificationBanner__clickable : ''}
      `}
      onClick={onClick}
    >
      {children}
      <Icon name="close" onClick={() => setIsOpen(false)} />
    </div>
  );
};

export default memo(NotificationBanner);
