import { Button, Icon } from 'semantic-ui-react';
import React, { useState } from 'react';
import { copyToClipboard } from '../../utils/file';

interface Props {
  data: any;
  className: string;
}

const CopyToClipboard = ({ data, className = '' }: Props) => {
  const [copyText, setCopyText] = useState('Copy to clipboard');
  const copyTo = () => {
    copyToClipboard(data).then(() => {
      setCopyText('Copied');
    });
    setTimeout(() => {
      setCopyText('Copy to clipboard');
    }, 500);
  };
  return (
    <span className={`${className} tooltip`}>
      <span className="tooltiptext" id="myTooltip">
        <span className="text-class">{copyText}</span>
      </span>
      {data}
      <Button icon className="copy-clipboard">
        <Icon name="copy outline" onClick={copyTo} />
      </Button>
    </span>
  );
};

export default CopyToClipboard;
