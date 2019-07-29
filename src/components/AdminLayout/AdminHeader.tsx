import * as React from 'react';
import { Dropdown, Icon, Image, Input, Menu, SemanticSIZES, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
import {
  getProductDetail, getProductDetailChartPrice,
  getProductDetailChartRank,
  getProducts, getProductsChartHistoryPrice, getProductsChartHistoryRank,
  getProductTrackData,
  postProductTrackGroupId, getTimeEfficiency, trackProductWithPatch, trackProductWithPost,
} from '../../Action/SYNActions';
import { connect } from 'react-redux';
import { SupplierDetail } from '../../containers/SYN/suppliers/supplierDetail';
import { SellField } from '../../Action/SettingActions';

export const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({
                                                                                size,
                                                                                centered,
                                                                              }) => (
  <Image
    ui={true}
    style={{width: 80}}
    centered={centered || false}
    src="/images/sellgo_logo.png"
  />
);

const options = [
  {key: 1, text: 'Choice 1', value: 1},
  {key: 2, text: 'Choice 2', value: 2},
  {key: 3, text: 'Choice 3', value: 3},
];

export class AdminHeader extends React.Component<any> {
  private readonly height = 45;
  userName = localStorage.getItem('nickName');

  render() {
    const {sellerData} = this.props;
    if (sellerData != undefined || sellerData != null) {
      if (sellerData.firstName.length > 0) {
        this.userName = sellerData.firstName + ' ' + sellerData.lastName;
      }
    }
    return (
      <React.Fragment>
        <Menu
          inverted={true} borderless={true} fixed="top"
          style={{height: this.height, backgroundColor: '#444444', paddingLeft: 80}}
          className="top-menu"
        >
          <Menu.Menu>
            <Menu.Item className="top-logo" as={Link} to="/" content={<Logo size="small"/>}/>
          </Menu.Menu>
          <Menu.Menu position="right" fitted='horizontally' style={{marginRight: 10}}>

            <Menu.Item>
              <Icon name="search" style={{fontSize: 25}} color={'red'}/>
            </Menu.Item>
            <Menu.Item>
              <Icon name="bell" style={{fontSize: 25}} color={'red'}/>
            </Menu.Item>
            <div style={{width: 1, height: '100%', alignSelf: 'center', backgroundColor: '#a4a4a4'}}/>
            <Menu.Item>
              <Icon name="user circle" style={{fontSize: 25}} color={'red'}/>
              <div style={{textAlign: 'center', fontSize: 16}}>
                Hello
                <span style={{display: 'block', width: '100%'}}>
                  {this.userName}
                </span>
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div id="navbar-spacer" style={{height: 45}}/>
      </React.Fragment>
    );
  }
}
