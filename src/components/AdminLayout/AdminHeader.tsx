import * as React from 'react';
import { Dropdown, Icon, Image, Input, Menu, SemanticSIZES, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

export const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({
                                                                                size,
                                                                                centered,
                                                                              }) => (
  <Image
    ui={true}
    size={size || ('tiny' as SemanticSIZES)}
    centered={centered || false}
    src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
  />
);

const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
];

export class AdminHeader extends React.Component<any> {
  private readonly height = '4rem';
  userName = 'FirstName LastName';

  render() {
    const { sellerData } = this.props;
    if (sellerData != undefined || sellerData != null) {
      // this.userName = sellerData.firstName+" "+sellerData.lastName;
      this.userName = sellerData.email;
    }
    return (
      <React.Fragment>
        <Menu inverted={true} borderless={true} fixed="top" style={{ height: this.height, backgroundColor: '#444444' }}
               className="top-menu">
          <Menu.Menu>
            <Menu.Item className="top-logo" as={Link} to="/" content={<Logo size="small"/>}/>
            {/*<Menu.Item*/}
            {/*  className="search-box"*/}
            {/*  content={*/}
            {/*    <Input*/}
            {/*      action={{ type: 'submit', content: '', icon: 'search' }}*/}
            {/*      placeholder="Search for UPC or ASIN or keyword"*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
          </Menu.Menu>
          <Menu.Menu position="right" fitted='horizontally' style={{ marginRight: 10 }}>

            <Menu.Item>
              <Icon name="search" size="big" color={'red'}/>
            </Menu.Item>
            <Menu.Item>
              <Icon name="bell outline" size="big" color={'red'}/>
            </Menu.Item>
            <div style={{ width: 1, height: '100%', alignSelf: 'center', backgroundColor: '#a4a4a4' }}/>
            <Menu.Item>
              <Icon name="user circle" size="big" color={'red'}/>
              <div style={{ textAlign: 'center' }}>
                Hello
                <span style={{ display: 'block', width: '100%' }}>
                  {this.userName}
                </span>
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div id="navbar-spacer" style={{ height: this.height }}/>
      </React.Fragment>
    );
  }
}
