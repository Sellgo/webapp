import * as React from "react";
import {Menu, Image,Input, Icon} from "semantic-ui-react";

import "./AdminSidebar.css";
import {SemanticSIZES} from "semantic-ui-react/dist/commonjs/generic";

export const Logo: React.SFC<{ size?: SemanticSIZES, centered?: boolean }> = ({size, centered}) => (
    <Image
        ui
        size={size || "tiny" as SemanticSIZES}
        centered={centered || false}
        src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
    />
);

export class AdminHeader extends React.Component {
    private readonly height = "3rem";

    render() {
        return <React.Fragment>
            <Menu borderless fixed="top" style={{height: this.height}}>
                <Menu.Item as="a" content={<Logo/>}/>
                <Menu.Item as="a" content={ <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...' /> }/>
            </Menu>
            <div id="navbar-spacer" style={{height: this.height}}/>
        </React.Fragment>;

    }
}
