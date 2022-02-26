import React, { memo } from 'react';
import { v4 as uuid } from 'uuid';
import Elevio from 'elevio/lib/react';

interface Props {
  className?: string;
  articleId: string;
  width?: number;
  height?: number;
}

const ElevioArticle = (props: Props) => {
  const { articleId, className } = props;
  const componentId = uuid();

  const loadArticle = () => {
    const target = document.getElementById(componentId);
    const searchCmpnt = window._elev.component({ type: 'article', id: articleId });
    /* Check if target has child */
    console.log(target?.childNodes);
    if (target && target.childNodes.length === 0) {
      target.appendChild(searchCmpnt);
    }
  };
  return (
    <>
      <div
        className={className}
        id={componentId}
        style={{
          width: props.width ? props.width : '100%',
          height: props.height ? props.height : '100%',
        }}
      />
      <Elevio accountId="6215241b91110" onReady={loadArticle} />
    </>
  );
};

export default memo(ElevioArticle);
