import React from 'react';
import { Icon } from 'semantic-ui-react';
import FolderCard from './FolderCard';

class OtherSort extends React.Component {
  state = {
    check: false,
    folder: false,
    unTrack: false,
    confirm: false,
  };
  handleClick = () => {
    const { check } = this.state;
    this.setState({
      check: !check,
      folder: true,
      unTrack: false,
    });
  };
  handleEllipsis = () => {
    const { check } = this.state;
    this.setState({
      check: !check,
      unTrack: true,
      folder: false,
    });
  };
  handleConfirmMessage = () => {
    const { confirm } = this.state;
    this.setState({
      confirm: true,
    });
  };
  handleCancel = () => {
    this.setState({
      confirm: false,
      folder: false,
      unTrack: false,
      check: false,
    });
  };
  render() {
    const { check, folder, unTrack, confirm } = this.state;
    return (
      <div className="other-sort">
        <Icon className="folder" onClick={this.handleClick} />
        {/* <Icon className="bell slash" /> */}
        <Icon className="ellipsis vertical" onClick={this.handleEllipsis} />
        {check && (
          <FolderCard
            folder={folder}
            unTrack={unTrack}
            confirm={confirm}
            confirmMessage={this.handleConfirmMessage}
            handleCancel={this.handleCancel}
          />
        )}
      </div>
    );
  }
}

export default OtherSort;
