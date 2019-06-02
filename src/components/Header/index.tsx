import * as React from "react";
import {Menu, Button, Divider} from "semantic-ui-react";
import {Logo} from "../Layout/Layout";

interface HeaderBarState {
    activeItem: string;
}

export class HeaderBar extends React.Component<{}, HeaderBarState> {
    state = {
        activeItem: '',
    };

    handleItemClick = (e: any, item : any) => {
        this.setState({activeItem: item.name});
    };

    render() {
        const {activeItem} = this.state;
        return <div>
            <Menu secondary>
                <Menu.Item>
                    <Logo centered size="small"/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Features'
                        active={activeItem === 'Features'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Pricing'
                        active={activeItem === 'Pricing'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='FAQs'
                        active={activeItem === 'FAQs'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Contact'
                        active={activeItem === 'Contact'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item>
                        <Button basic onClick={() => window.location.href = "/login"}>Log-in</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button primary onClick={() => window.location.href = "/sign-up"}>Sign up</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Divider/>
        </div>
    }
}
