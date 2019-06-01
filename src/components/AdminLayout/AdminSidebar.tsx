import * as React from "react";
import {Menu, Sidebar, Icon} from "semantic-ui-react";

import "./AdminSidebar.css";
import {Link} from "react-router-dom";


interface LayoutProps {
  children?: React.ReactNode
}

export class AdminSidebar extends React.Component<LayoutProps> {
  render() {
    return <Sidebar as={Menu} borderless inverted vertical visible>
      <Menu.Item>
        <Menu.Header as={Link} to="/"><Icon name='home'/> My Dashboard</Menu.Header>
        <Menu.Item>
          Pre-selling
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item as='a'>
            <Icon name='server'/> PTR
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='sellsy'/> SYN
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='add circle'/> SRE
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='sync alternate'/> PRE
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='spy'/> CRE
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='hand pointer outline'/> KEY
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='align justify'/> LAT
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item>
          Prep
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item as='a'>
            <Icon name='barcode'/> LOG
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item>
          Live
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item as='a'>
            <Icon name='chart line'/> PRI
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='law'/> LOP
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item>
          Post-selling
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item as='a'>
            <Icon name='move'/> Access
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='settings'/> Settings
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='log out'/> Logout
      </Menu.Item>
    </Sidebar>
  }
}
