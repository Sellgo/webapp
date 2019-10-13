import React, { useState } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import './index.scss';

function FilterSection(props: any) {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="filterSection">
      <div className="filterHead">
        <p>
          {title}
          <Popup
            className="addSupplierPopup"
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </p>
        <Icon
          name={isOpen ? 'chevron up' : 'chevron down'}
          size="small"
          className="up_icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="filterContent">{isOpen && children}</div>
    </div>
  );
}

export default FilterSection;
