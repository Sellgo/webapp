import * as React from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import './index.scss';

const MinMaxInput = (props: any) => {
  const { title, minPlaceHolder, maxPlaceHolder } = props;
  return (
    <Container className="minMaxInput">
      <div className="minMaxInputTitle">
        <p>
          {title}
          <Popup
            className="addSupplierPopup"
            trigger={<Icon name="question circle" size="small" color="grey" />}
            position="top left"
            size="tiny"
          />
        </p>
      </div>
      <div className="inputContainer">
        <Input placeholder={minPlaceHolder}></Input>
        <Icon name="arrow right" />
        <Input placeholder={maxPlaceHolder}></Input>
      </div>
    </Container>
  );
};

export default MinMaxInput;
