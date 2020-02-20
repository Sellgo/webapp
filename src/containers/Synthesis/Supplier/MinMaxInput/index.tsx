import * as React from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import './index.scss';

const MinMaxInput = (props: any) => {
  const { title, minPlaceHolder, maxPlaceHolder } = props;
  return (
    <Container className="min-max-input">
      <div className="min-max-input-title">
        <p>
          {title}
          <Popup
            className="add-supplier-popup"
            trigger={<Icon name="question circle" size="small" color="grey" />}
            position="top left"
            size="tiny"
          />
        </p>
      </div>
      <div className="input-container">
        <Input placeholder={minPlaceHolder} />
        <Icon name="arrow right" />
        <Input placeholder={maxPlaceHolder} />
      </div>
    </Container>
  );
};

export default MinMaxInput;
