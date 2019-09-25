import * as React from 'react';
import { Popup, Icon, Input } from 'semantic-ui-react';

import './minMaxInput.css';

const MinMaxInput = (props: any) => {
  const { title, minPlaceHolder, maxPlaceHolder } = props;
  return (
    <>
      <div className={'minMaxInput'}>
        <p>
          {title}
          <Popup
            className={'addSupplierPopup'}
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </p>
      </div>
      <div className={'inputContainer'}>
        <Input placeholder={minPlaceHolder}></Input>
        <Icon name="arrow right" />
        <Input placeholder={maxPlaceHolder}></Input>
      </div>
    </>
  );
};

export default MinMaxInput;
