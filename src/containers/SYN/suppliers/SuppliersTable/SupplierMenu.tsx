import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSupplierTableTab } from '../../../../Action/suppliers';

interface SupplierMenuProps {
  allCount: number;
  shortlistedCount: number;
  archivedCount: number;
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
        <Menu pointing secondary style={{ width: 'max-content' }} color={'blue'}>
          <Menu.Item name="all" active={activeTab === 'all'} onClick={this.handleItemClick}>
            <Header as="h4">All Suppliers ({this.props.allCount})</Header>
          </Menu.Item>
          <Menu.Item
            name="shortlisted"
            active={activeTab === 'shortlisted'}
            onClick={this.handleItemClick}
          >
            <Header as="h4">
              Shortlisted <span style={{ color: 'green' }}>({this.props.shortlistedCount})</span>
            </Header>
          </Menu.Item>
          <Menu.Item
            name="archived"
            active={activeTab === 'archived'}
            onClick={this.handleItemClick}
          >
            <Header as="h4">
              Archived <span style={{ color: 'red' }}>({this.props.archivedCount})</span>
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
