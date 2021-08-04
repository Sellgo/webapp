import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { copyToClipboard } from '../../utils/file';

/* Components */
import CopyToClipboard from '../CopyToClipboard';

/* Styling */
import styles from './index.module.scss';

interface Props {
  data: any;
  className?: string;
  displayData?: string;
  link: string;
}

const CopyAndLocateClipboard: React.FC<Props> = props => {
  const { link, displayData, data, className } = props;

  const [copied, setCopied] = useState(false);

  const copyText = (text: string) => {
    copyToClipboard(text).then(() => {
      setCopied(true);
    });

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  if (!link) {
    return <CopyToClipboard displayData={displayData} data={data} />;
  }

  return (
    <a href={link} className={styles.navigateLink}>
      <span className={`${styles.copyData} ${className}`}>
        {displayData ? displayData : data}
        <span>
          {!copied ? (
            <Icon
              name="copy outline"
              className="tooltipIcon"
              data-title="Copy"
              onClick={() => copyText(data)}
            />
          ) : (
            <Icon name="check circle" className="tooltipIcon" data-title="Copied" color="green" />
          )}
        </span>
      </span>
    </a>
  );
};

export default CopyAndLocateClipboard;
