import React, { Component } from 'react';
import { Modal, Button, Form, Label } from 'semantic-ui-react';

interface CreateGroupProps {
  open: boolean;
  handleGroupChange: Function;
  handleCancel: any;
  handleSubmit: any;
  error: boolean;
  groupError: boolean;
}

class CreateGroup extends Component<CreateGroupProps> {
  render() {
    const { open, handleGroupChange, handleCancel, handleSubmit, error, groupError } = this.props;
    return (
      <div className="create-group-modal">
        <Modal
          as={Form}
          error={error}
          onSubmit={(e: any) => handleSubmit(e)}
          open={open}
          className="create-group-modal"
        >
          <Modal.Header>Create New Group</Modal.Header>
          <Modal.Content>
            <div>
              <Form.Input
                label="New Group Name:"
                placeholder="Your Group"
                onChange={e => handleGroupChange(e)}
                error={error}
                required
              />
              {error && (
                <Label pointing="above" basic={true} color="red">
                  Please enter a name
                </Label>
              )}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-btn" type="button" onClick={handleCancel}>
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
