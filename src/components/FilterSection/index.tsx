import React, { useState } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import './index.scss';

function FilterSection(props: any) {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="filter-section">
      <div className="filter-head">
        <p>
          {title}
          <Popup
            className="add-supplier-popup"
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </p>
        <Icon
          name={isOpen ? 'chevron up' : 'chevron down'}
          size="small"
          className="up-icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="filter-content">{isOpen && children}</div>
    </div>
  );
}

export default FilterSection;
