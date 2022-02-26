import React, { memo } from 'react';
import { v4 as uuid } from 'uuid';
import Elevio from 'elevio/lib/react';
import { AppConfig } from '../../config';

interface Props {
  className?: string;
  articleId: string;
  width?: number;
  height?: number;
}

const ElevioArticle = (props: Props) => {
  const { articleId, className } = props;
  const [isElevioLoaded, setIsElevioLoaded] = React.useState<boolean>(false);
  const componentId = uuid();

  React.useEffect(() => {
    if (isElevioLoaded) {
      const target = document.getElementById(componentId);
      const articleComponent = window._elev.component({ type: 'article', id: articleId });

      /* Check if target already loaded the article */
      if (target && target.childNodes.length === 0) {
        target.appendChild(articleComponent);
      }
    }
  }, [isElevioLoaded]);

  const loadElevio = () => {
    setIsElevioLoaded(true);
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
      <Elevio accountId={AppConfig.ELEVIO_KEY} onReady={loadElevio} />
    </>
  );
};

export default memo(ElevioArticle);
