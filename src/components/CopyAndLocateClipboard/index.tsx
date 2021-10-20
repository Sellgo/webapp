import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { copyToClipboard } from '../../utils/file';

/* Styling */
import styles from './index.module.scss';

interface Props {
  data: any;
  className?: string;
  wrapperClassName?: string;
  displayData?: string;
  link: string;
}

const CopyAndLocateClipboard: React.FC<Props> = props => {
  const { link, displayData, data, className, wrapperClassName } = props;

  const [copied, setCopied] = useState(false);

  const copyText = (text: string) => {
    copyToClipboard(text).then(() => {
      setCopied(true);
    });

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <span className={`${styles.navigateLinkWrapper} ${wrapperClassName}`}>
      <a
        href={link}
        className={`${styles.navigateLink} ${className}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className={`${styles.copyData} ${className}`}>
          {displayData ? displayData : data}
        </span>
      </a>
      <span>
        {!copied ? (
          <Icon
            name="copy outline"
            className="tooltipIcon"
            data-title="Copy"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              copyText(data);
            }}
          />
        ) : (
          <Icon name="check circle" className="tooltipIcon" data-title="Copied" color="green" />
        )}
      </span>
    </span>
  );
};

export default CopyAndLocateClipboard;
