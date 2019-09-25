import * as React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import './filterSection.css';

const FilterSection = (props: any) => {
  const { title, children } = props;
  return (
    <div className={''}>
      <div className={'filterHead'}>
        <p>
          {title}
          <Popup
            className={'addSupplierPopup'}
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </p>
        <Icon name="angle up" size={'small'} color={'grey'} />
      </div>
      <div className={'content'}>{children}</div>
    </div>
  );
};

export default FilterSection;
