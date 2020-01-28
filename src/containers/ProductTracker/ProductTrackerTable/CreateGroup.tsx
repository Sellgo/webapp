import React, { Component } from 'react';
import { Input, Modal, Button, Label } from 'semantic-ui-react';

interface CreateGroupProps {
  open: boolean;
  handleGroupChange: Function;
  handleCancel: any;
  handleSubmit: any;
  error: boolean;
}

class CreateGroup extends Component<CreateGroupProps> {
  render() {
    const { open, handleGroupChange, handleCancel, handleSubmit, error } = this.props;
    return (
      <div className="create-group-modal">
        <Modal open={open} className="create-group-modal">
          <Modal.Header>Create New Group</Modal.Header>
          <Modal.Content>
            <div>
              <h4>{'New Group Name:'}</h4>
              <Input placeholder="Your Group" error={error} onChange={e => handleGroupChange(e)} />
              {error && (
                <Label pointing="above" basic={true} color="red">
                  Please enter a value
                </Label>
              )}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="create-btn" onClick={handleSubmit}>
              Create Group
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateGroup;
