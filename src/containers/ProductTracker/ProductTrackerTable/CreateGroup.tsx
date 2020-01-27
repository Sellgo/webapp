import React, { Component } from 'react';
import { Input, Modal, Button, Form } from 'semantic-ui-react';

interface CreateGroupProps {
  open: boolean;
  handleGroupChange: Function;
  handleCancel: any;
  handleSubmit: any;
}

class CreateGroup extends Component<CreateGroupProps> {
  render() {
    const { open, handleGroupChange, handleCancel, handleSubmit } = this.props;
    return (
      <div className="create-group-modal">
        <Modal
          as={Form}
          onSubmit={(e: any) => handleSubmit(e)}
          open={open}
          className="create-group-modal"
        >
          <Modal.Header>Create New Group</Modal.Header>
          <Modal.Content>
            <Form.Input
              label="New Group Name:"
              placeholder="Your Group"
              onChange={e => handleGroupChange(e)}
              required
            />
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="create-btn" type="submit">
              Create Group
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateGroup;
