import * as React from "react";
import {Menu, Sidebar, Icon } from "semantic-ui-react";

import "./AdminSidebar.css";
import {Link} from "react-router-dom";


interface LayoutProps {
    children?: React.ReactNode
}

export class AdminSidebar extends React.Component<LayoutProps> {
    render() {
        return <Sidebar as={Menu} borderless inverted vertical visible>
                    <Menu.Item as={Link} to="/">
                        <Icon name='home'/> My Dashboard
                    </Menu.Item>
                    <Menu.Item as={Link} to="/product-tracker">
                        <Icon name='gamepad'/> Product Tracker
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Supplier Synthesis
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Supplier Research
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Product Research
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Keywords
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Listing Automation
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad'/> Logistic
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