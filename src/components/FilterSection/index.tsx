import * as React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import './index.scss';

class FilterSection extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  _handleIsOpenMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { title, children } = this.props;
    const { isOpen } = this.state;
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
            onClick={this._handleIsOpenMenu}
          />
        </div>
        <div className="filterContent">{isOpen && children}</div>
      </div>
    );
  }
}

export default FilterSection;
