import * as React from 'react';
import { Popup, Icon, Checkbox, Container, Divider } from 'semantic-ui-react';

const CheckboxFilter = (props: any) => {
  const { title } = props;

  return (
    <Container className="checkbox-filter">
      <div className="checkbox-filter-container">
        <div className="filter-title">
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
        <Checkbox label={'Avg Amazon Stock'} />
      </div>
      <Divider />
    </Container>
  );
};
export default CheckboxFilter;
