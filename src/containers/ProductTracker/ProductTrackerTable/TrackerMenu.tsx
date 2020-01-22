import React, { Component } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import './index.scss';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { retrieveProductTrackGroup } from '../../../actions/ProductTracker';
import CreateGroup from './CreateGroup';

interface TrackerMenuProps {
  retrieveTrackGroup: () => void;
}
class TrackerMenu extends Component<TrackerMenuProps> {
  state = {
    open: false,
  };

  componentDidMount() {
    const { retrieveTrackGroup } = this.props;
    retrieveTrackGroup();
  }

  handleItemClick = (e: any) => {
    this.setState({
      open: true,
    });
  };
  handleCancel = () => {
    this.setState({
      open: false,
    });
  };
  handleChange = (e: any) => {
    console.log('====', e.target.value);
  };

  render() {
    return (
      <div className="menu-bar">
        <Menu
          pointing={true}
          stackable={true}
          secondary={true}
          style={{ width: 'max-content' }}
          color={'blue'}
          className="wdt100"
        >
          <Menu.Item
            name="All Groups"
            active={true}
            // onClick={this.handleItemClick}
          >
            <Header as="h4">All Groups</Header>
          </Menu.Item>
          <Menu.Item
            name="Ungrouped"
            //  onClick={this.handleItemClick}
          >
            <Header as="h4">Ungrouped</Header>
          </Menu.Item>
          <Menu.Item
            name="Group 1"
            // onClick={this.handleItemClick}
          >
            <Header as="h4">Group 1</Header>
          </Menu.Item>
          <Menu.Item name="+" onClick={this.handleItemClick}>
            <Header as="h4">+</Header>
          </Menu.Item>
        </Menu>
        <CreateGroup
          open={this.state.open}
          handleGroupChange={(e: any) => this.handleChange(e)}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  trackGroup: get(state, 'productTracker.trackerGroup'),
});

const mapDispatchToProps = {
  retrieveTrackGroup: () => retrieveProductTrackGroup(),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackerMenu);
