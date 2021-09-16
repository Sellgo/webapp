import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label: string;
  exportContent: React.ReactNode;
  className?: string;
}

const TableExport = (props: Props) => {
  const { label, className, exportContent } = props;

  return (
    <div className={`${styles.exportButtonContainer} ${className}`}>
      <p className={styles.exportLabel}>
        <Icon name="download" className={styles.downloadIcon} />
        {label}
      </p>

      <Popup
        className={styles.exportPopup}
        on="click"
        position="bottom right"
        offset="-5"
        trigger={
          <Icon name="angle down" className={styles.caretDownIcon} style={{ cursor: 'pointer' }} />
        }
        content={exportContent}
      />
    </div>
  );
};

export default TableExport;
