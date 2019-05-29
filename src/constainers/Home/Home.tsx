import "./Home.css";
import * as React from "react";
import {Segment, Button, Header, Grid, Divider, Icon, Container} from "semantic-ui-react";
import {HeaderBar} from "../../components/Header";


interface HomeState {
    heading: string;
    amount: number;
    cityName: string;
}

export class Home extends React.Component<{}, HomeState> {

    state = {
        heading: 'by become an Amazon Seller',
        amount: 1000,
        cityName: 'USA',
    };

    componentDidMount() {
    }

    render() {
        const {heading, amount, cityName} = this.state;

        return <Segment basic>
            <HeaderBar/>
            <Container>
                <Segment padded='very'>
                    <Grid className={'home-desc'}>
                        <Grid.Row>
                            <Grid.Column verticalAlign={'middle'}>
                                <Header as='h3' color='grey'>
                                    {`$${amount}/mo ${heading}`}
                                    <br/>
                                    {`from ${cityName}`}
                                </Header>

                                <Button
                                    primary
                                    content="Get started for FREE"
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Divider/>
                <Header as='h4' className={'home-footer'}>
                    <Icon name='dollar'/>
                    <Header.Content>
                        Make $ {amount} on Amazon guaranteed
                        <Header sub primary>Learn More <i className={'right-arrow'}>></i></Header>
                    </Header.Content>
                </Header>
            </Container>
        </Segment>
    }
}
