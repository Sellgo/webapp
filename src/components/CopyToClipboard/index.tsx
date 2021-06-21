import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { copyToClipboard } from '../../utils/file';

interface Props {
  data: any;
  className?: string;
}

const CopyToClipboard: React.FC<Props> = props => {
  const { data, className } = props;
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
    <span className={className}>
      {data}
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
  );
};

export default CopyToClipboard;
