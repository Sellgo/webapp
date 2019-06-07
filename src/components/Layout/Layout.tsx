import * as React from "react";
import {Menu, Sidebar, Icon, Segment, Image, SemanticSIZES} from "semantic-ui-react";

import "./Layout.css";
import {Link} from "react-router-dom";

export const Logo: React.SFC<{ size?: SemanticSIZES, centered?: boolean }> = ({size, centered}) => (
    <Image
        ui
        size={size || "tiny" as SemanticSIZES}
        centered={centered || false}
        src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
    />
);

class NavBar extends React.Component {
    private readonly height = "3rem";

    render() {
        return <React.Fragment>
            <Menu borderless fixed="top" style={{height: this.height}}>
                <Menu.Item as="a" content={<Logo/>}/>
                <Menu.Item as="a" content="My Listings "/>
            </Menu>
            <div id="navbar-spacer" style={{height: this.height}}/>
        </React.Fragment>;
    }
}

interface LayoutProps {
    children?: React.ReactNode
}

export class Layout extends React.Component<LayoutProps> {
    render() {
        const {children} = this.props;

        return <React.Fragment>
            <NavBar/>
            <Sidebar.Pushable style={{minHeight: "calc(100vh - 3rem)"}}>
                <Sidebar as={Menu} borderless inverted vertical visible>
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

                <Sidebar.Pusher style={{width: "calc(100vw - 260px)"}}>
                    <Segment basic>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </React.Fragment>;
    }
}
