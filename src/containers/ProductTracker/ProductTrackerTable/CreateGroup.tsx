import React, { Component } from 'react';
import { Input, Modal, Button } from 'semantic-ui-react';

interface CreateGroupProps {
  open: boolean;
  handleGroupChange: Function;
  handleCancel: any;
}

class CreateGroup extends Component<CreateGroupProps> {
  render() {
    const { open, handleGroupChange, handleCancel } = this.props;
    return (
      <div className="create-group-modal">
        <Modal open={open} className="create-group-modal">
          <Modal.Header>Create New Group</Modal.Header>
          <Modal.Content>
            <div>
              <h4>New Group Name:</h4>
              <Input placeholder="Your Group" onChange={e => handleGroupChange(e)} />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="create-btn">Create Group</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateGroup;
