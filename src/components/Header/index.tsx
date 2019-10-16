import * as React from 'react';
import { Divider, Menu } from 'semantic-ui-react';
import Logo from '../Logo';
import GenericButton from '../Button';

interface HeaderBarState {
  activeItem: string;
}

export class HeaderBar extends React.Component<any, HeaderBarState> {
  state = {
    activeItem: '',
  };

  handleItemClick = (e: any, item: any) => {
    this.setState({ activeItem: item.name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu secondary={true}>
          <Menu.Item>
            <Logo centered={true} size="small" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="Home" active={activeItem === 'Home'} onClick={this.handleItemClick} />
            <Menu.Item
              name="Features"
              active={activeItem === 'Features'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Pricing"
              active={activeItem === 'Pricing'}
              onClick={this.handleItemClick}
            />
            <Menu.Item name="FAQs" active={activeItem === 'FAQs'} onClick={this.handleItemClick} />
            <Menu.Item
              name="Contact"
              active={activeItem === 'Contact'}
              onClick={this.handleItemClick}
            />
            {/* temporary removed*/}
            {/*<Menu.Item>*/}
            {/*<GenericButton isLink={true} toLink="/login" content="Sign In" />*/}
            {/*</Menu.Item>*/}
            <Menu.Item>
              <GenericButton isClickable={true} onClick={this.props.login} content="Sign In" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Divider />
      </div>
    );
  }
}
