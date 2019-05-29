import "./setting.css";
import * as React from "react";
import {Segment, Form, Header, Grid, Divider, Container, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface SettingState {

}
const amazonAuth = [
    {
        id: 1,
        type: 'Narth Ameriac US/CA/MX/BR',
        sellerId:11,
        token: 'none'
    },
    {
        id: 2,
        type: 'Europe-  UK/DE/ES/IN/TR',
        sellerId:112,
        token: 'none'
    },{
        id: 3,
        type: 'Asia-  JP/CH',
        sellerId:112,
        token: 'none'
    }
];
export class Setting extends React.Component<{}, SettingState> {

    componentDidMount() {
    }

    render() {
        const custNAme = " MY Nmae/ customare'";
        const memberDate = `May 5 2018`;

        return <Segment basic className={'setting'}>
            <Segment padded='very'>

                <Header as='h3' color='grey'>
                    Account
                </Header>
                <Divider/>
                <Header as='h3'>
                    <Image circular src='/images/avatar/large/patrick.png'/>
                    <Header.Content>
                        {custNAme}
                        <Header.Subheader>member since: {memberDate}</Header.Subheader>
                    </Header.Content>
                </Header>
                <Grid padded className={'user-account-info'}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header size='small'>
                                Account TYPE
                                <Header.Subheader><span>free</span> <Link to="/#"
                                                                          style={{fontSize: "smaller"}}>Upgrade</Link></Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='small'>
                                PHONE NUMBER <Link to="/#" style={{fontSize: "smaller"}}>confirm
                                phone</Link>
                                <Header.Subheader><span>set</span></Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='small'>
                                PRIMARY EMAIL <Link to="/#" style={{fontSize: "smaller"}}>change</Link>
                                <Header.Subheader><span>set</span></Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='small'>
                                PAYMENT METHOD <Link to="/#" style={{fontSize: "smaller"}}>(Change)</Link>
                                <Header.Subheader><span>set not</span> <Link to="/#"
                                                                             style={{fontSize: "smaller"}}> Add
                                    Credit Card</Link></Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='small'>
                                ADDRESS <Link to="/#" style={{fontSize: "smaller"}}>Click to enter</Link>
                                <Header.Subheader><span>set</span></Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='small'>
                                PASSWORD <Link to="/#" style={{fontSize: "smaller"}}>change</Link>
                                <Header.Subheader><span>set</span></Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment padded='very'>
                <Header as='h3' color='grey'>
                    Amazon MWS Authorization
                </Header>
                <Divider/>
                {amazonAuth.map((auth ,key)=><Segment key={key} basic>
                    <Header as='h5' color='grey'>
                        {auth.type}
                    </Header>
                    <Divider/>
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header as='h5' color='grey'>
                                        MWS Seller ID
                                    </Header>
                                    <Header as='h5' color='grey'>
                                        MWS Auth Token
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Form>
                                        <Form.Field>
                                            <input type="text" placeholder="MWS Seller ID"/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input type="text" placeholder="MWS Auth Token"/>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column width={5} verticalAlign='middle' floated={'right'}>
                                    <div>
                                        <Icon name='refresh'/>
                                        <Icon name='checkmark' circular inverted/>
                                        <Icon name='close'/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>)}
            </Segment>
        </Segment>

    }
}
