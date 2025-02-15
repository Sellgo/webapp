/* eslint-disable max-len */
import React from 'react';

interface Props {
  fill?: string;
}

const SellerCollectionIcon: React.FC<Props> = props => {
  const { fill } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11.25" viewBox="0 0 15 11.25">
      <path
        id="folder-plus"
        d="M13.594,65.875H7.969L6.094,64H1.406A1.406,1.406,0,0,0,0,65.406v8.438A1.406,1.406,0,0,0,1.406,75.25H13.594A1.406,1.406,0,0,0,15,73.844V67.281A1.406,1.406,0,0,0,13.594,65.875ZM10.781,70.8a.469.469,0,0,1-.469.469H8.2v2.109a.469.469,0,0,1-.469.469H7.266a.469.469,0,0,1-.469-.469V71.266H4.688a.469.469,0,0,1-.469-.469v-.469a.469.469,0,0,1,.469-.469H6.8V67.75a.469.469,0,0,1,.469-.469h.469a.469.469,0,0,1,.469.469v2.109h2.109a.469.469,0,0,1,.469.469Z"
        transform="translate(0 -64)"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default SellerCollectionIcon;
