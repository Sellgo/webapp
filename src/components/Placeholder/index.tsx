import React from 'react';
import { Placeholder as SemanticPlaceholder } from 'semantic-ui-react';
import './index.scss';

interface Props {
  numberRows: number;
  numberParagraphs: number;
  isGrey?: boolean;
}

const Placeholder = (props: Props) => {
  const { numberRows, isGrey, numberParagraphs } = props;
  return (
    <div id={isGrey ? 'grey' : 'white'}>
      <SemanticPlaceholder fluid id="grey">
        <SemanticPlaceholder.Header image>
          <SemanticPlaceholder.Line />
          <SemanticPlaceholder.Line />
        </SemanticPlaceholder.Header>
        {Array.from(Array(numberParagraphs).keys()).map(para => (
          <SemanticPlaceholder.Paragraph key={para}>
            {para % 2 === 0 && (
              <SemanticPlaceholder.Header image>
                <SemanticPlaceholder.Line />
                <SemanticPlaceholder.Line />
              </SemanticPlaceholder.Header>
            )}
            <div className={'placeholder-gap'} />
            {Array.from(Array(numberRows).keys()).map(row => (
              <SemanticPlaceholder.Line key={row} />
            ))}
          </SemanticPlaceholder.Paragraph>
        ))}
      </SemanticPlaceholder>
    </div>
  );
};

export default Placeholder;
