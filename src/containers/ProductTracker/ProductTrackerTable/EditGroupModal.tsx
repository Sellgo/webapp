import React, { Component } from 'react';
import { Modal, Button, Form, Label } from 'semantic-ui-react';

interface EditGroupModalProps {
  open: boolean;
  activeGroup: any;
  handleCancel: any;
  handleSubmit: any;
  error: boolean;
}

class EditGroupModal extends Component<EditGroupModalProps> {
  state = {
    name: this.props.activeGroup ? this.props.activeGroup.name : '',
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      name: nextProps.activeGroup ? nextProps.activeGroup.name : '',
    });
  }

  handleNameChange = (e: any) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { open, handleCancel, handleSubmit, activeGroup, error } = this.props;
    return (
      <div className="edit-group-modal">
        <Modal
          as={Form}
          onSubmit={(e: any) => {
            e.preventDefault();
            const newGroup = { ...activeGroup, name: this.state.name };
            handleSubmit(newGroup);
          }}
          open={open}
          className="edit-group-modal"
        >
          <Modal.Header>Edit New Group</Modal.Header>
          <Modal.Content>
            <Form.Input
              label="Group Name:"
              placeholder="Your Group"
              value={this.state.name}
              onChange={e => this.handleNameChange(e)}
              required={true}
              error={error}
            />
            {error && (
              <Label pointing="above" basic={true} color="red">
                Please enter a name
              </Label>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-btn" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="edit-btn" color="blue" type="submit">
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditGroupModal;
