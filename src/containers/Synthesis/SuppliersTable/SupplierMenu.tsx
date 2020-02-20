import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSupplierTableTab } from '../../../actions/Suppliers';
import './index.scss';

interface SupplierMenuProps {
  allCount: number;
  shortlistedCount: number;
  archivedCount: number;
  draftCount: number;
  activeTab: string;
  setTab: (tab: string) => void;
}
class SupplierMenu extends Component<SupplierMenuProps> {
  handleItemClick = (e: any, data: any) => {
    this.props.setTab(data.name);
  };

  render() {
    const { activeTab } = this.props;

    return (
      <div>
        <Menu
          pointing={true}
          secondary={true}
          style={{ width: 'max-content' }}
          color={'blue'}
          className="flex-col wdt100 menu-item"
        >
          <Menu.Item
            name="all"
            active={activeTab === 'all'}
            onClick={this.handleItemClick}
            className="wdt100"
          >
            <Header as="h4">All Suppliers ({this.props.allCount})</Header>
          </Menu.Item>
          <Menu.Item
            name="shortlisted"
            active={activeTab === 'shortlisted'}
            onClick={this.handleItemClick}
            className="wdt100"
          >
            <Header as="h4">
              Shortlisted <span style={{ color: '#016936' }}>({this.props.shortlistedCount})</span>
            </Header>
          </Menu.Item>
          <Menu.Item
            name="archived"
            active={activeTab === 'archived'}
            onClick={this.handleItemClick}
            className="wdt100"
          >
            <Header as="h4">
              Archived <span style={{ color: '#B03060' }}>({this.props.archivedCount})</span>
            </Header>
          </Menu.Item>
          <Menu.Item
            name="draft"
            active={activeTab === 'draft'}
            onClick={this.handleItemClick}
            className="wdt100"
          >
            <Header as="h4">
              Draft <span style={{ color: '#A0A0A0' }}>({this.props.draftCount})</span>
            </Header>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({});

const mapDispatchToProps = {
  setTab: (tab: string) => setSupplierTableTab(tab),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierMenu);
