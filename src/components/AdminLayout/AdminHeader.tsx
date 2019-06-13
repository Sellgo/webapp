import * as React from "react";
import {Menu, Image, Input, Icon, Dropdown, SemanticSIZES} from "semantic-ui-react";

import "./AdminSidebar.css";
import { Link } from "react-router-dom";

export const Logo: React.SFC<{ size?: SemanticSIZES, centered?: boolean }> = ({size, centered}) => (
  <Image
    ui
    size={size || "tiny" as SemanticSIZES}
    centered={centered || false}
    src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
  />
);

const options = [
  {key: 1, text: 'Choice 1', value: 1},
  {key: 2, text: 'Choice 2', value: 2},
  {key: 3, text: 'Choice 3', value: 3},
]

export class AdminHeader extends React.Component {
  private readonly height = "5rem";

  render() {
    return <React.Fragment>
      <Menu borderless fixed="top" style={{height: this.height}} className="top-menu">
        <Menu.Item className="top-logo" as={Link} to='/' content={<Logo size="small"/>}/>
        <Menu.Item
          className="search-box"
          content={<Input action={{type: 'submit', content: '', icon: 'search'}}
          placeholder='Search for UPC or ASIN or keyword'/>}/>
        <Menu.Item position='right'>
          <Dropdown
            trigger={<span>
                      <Icon name='folder open' size='big'/>
                    </span>} options={options}/>
          <Dropdown
            trigger={<span>
                      <Icon name='user' size='big' />
                    </span>} options={options}/>
          <Dropdown
            trigger={<span>
                      <Icon name='question circle outline' size='big'/>
                    </span>} options={options}/>
        </Menu.Item>
      </Menu>
      <div id="navbar-spacer" style={{height: this.height}}/>
    </React.Fragment>;

  }
}
