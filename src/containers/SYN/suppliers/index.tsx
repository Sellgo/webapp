import * as React from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Select,
  Table,
  Checkbox,
  Dropdown,
  Input,
  Icon,
  Menu,
  Popup,
  Modal
} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import MesssageComponent from '../../../components/MessageComponent';
// import { Modals } from '../../../components/Modals';
// import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import './suppliers.css';

import { Link } from 'react-router-dom';

import {
  getSellers
} from '../../../Action/SYNActions';

interface State {
  isOpen: boolean;
}

interface Props {
  getSellers(): () => void;
}

export class Suppliers extends React.Component<Props, State> {
  state = {
    isOpen: false,
    size: "",
    open: false
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
  };

  componentDidMount() {
    console.log("this.props: ", this.props)
    const data = {
      key: 'haseeb',
      value: 'haseeb',
    };
    this.props.getSellers();
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  show(size: string) {
    // this.setState({ size: size, open: true })
  }
  close = () => {
    // this.setState({ open: false })
  }

  render() {
    const memberDate = `May 5 2018`;
    const { isOpen } = this.state;

    const open = this.state.open

    return (
      <Segment basic={true} className="setting">

        <Divider />


        <Grid>
          <Grid.Column width={5} floated='left'>
            <Button
              basic color='black'
              primary={true}
              content="Add New Supplier"
              style={{ borderRadius: '50px' }}
            />
            <Popup
              trigger={<Icon name='question circle' circular />}
              content='Sellgo'
              position='top left'
              size='tiny'
            />
          </Grid.Column>
          <Grid.Column width={5} floated='right'>
            <div className="ui" style={{
              display: "inline-flex",
              border: "1px solid #000",
              padding: "11px",
              borderRadius: "15px"
            }}>
              <span style={{ padding: "8px" }} >
                Time Saved
                <h2>
                  <strong>
                    99 hrs
                 </strong>
                </h2>
              </span>
              <span style={{ padding: "8px" }} >
                Efficiency
                <h2>
                  <strong>
                    99%
                  </strong>
                </h2>
              </span>
            </div>
          </Grid.Column>
        </Grid>

        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Supplier Name
                </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Product to Listing Ratio</Table.HeaderCell>
              <Table.HeaderCell>Supplier Rate (%)</Table.HeaderCell>
              <Table.HeaderCell>Note</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Checkbox /></Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  supInfo
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>status</Table.Cell>
              <Table.Cell>
                <Dropdown text='SYN'
                  fluid
                  selection
                  options={[{
                    key: 'One',
                    text: 'One',
                    value: 'One',
                  },
                  {
                    key: 'Two',
                    text: 'Two',
                    value: 'Two',
                  }]}>
                  {/* <Dropdown.Menu>
                    <Dropdown.Item text='option1' />
                    <Dropdown.Item text='option2' />
                  </Dropdown.Menu> */}
                </Dropdown>
              </Table.Cell>
              <Table.Cell>totProd/act</Table.Cell>
              <Table.Cell>supRate</Table.Cell>
              <Table.Cell>
                <Input focus placeholder='Note' />
              </Table.Cell>
              <Table.Cell>
                <Table.Cell as={Link} to="/syn" >
                  <Icon name='cloud upload' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='refresh' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='pencil' style={{ color: "black" }} />&nbsp;
                </Table.Cell>
                <Table.Cell as={Link} to="/syn">
                  <Icon name='trash alternate' style={{ color: "black" }} />
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>



        <Modal open={open} onClose={this.close}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>

      </Segment >
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log("state state: ", state);
  return ({
    suppliers: state
  });
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suppliers);