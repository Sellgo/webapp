import Icon from '@material-ui/core/Icon';
import * as React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link} from "react-router-dom";
import {Button, Grid, Header, Segment} from "semantic-ui-react";
import "./MessageComponent.css";


function MesssageComponent(props: any) {
  const items = props.message;
  const isModal = props.isModal;

  return (<Segment basic clearing>
    <Grid className={!isModal ? "pop-up" : ""}>
      <Grid.Row>
        <Grid.Column textAlign="center" style={{padding: 10}} width={16}>
          <div className="heading-h1">
            {items.title}
          </div>
        </Grid.Column>
        <Grid.Column textAlign="center" style={{padding: 10, display: "flex", justifyContent: "center"}} width={16}>
          <Icon style={{fontSize: 30, color: "#0E6FCF"}}>check_circle</Icon>
          <Header as='h3' style={{
            fontSize: 24,
            color: "#0E6FCF",
            fontFamily: "Montserrat",
            marginTop: 0
          }}>{items.message}</Header>
        </Grid.Column>

        <Grid.Column textAlign="center" width={16}>
          <Header.Content>{items.description}</Header.Content>
          <Header.Content>{items.description2}</Header.Content>
        </Grid.Column>
        {!isModal ? <Grid.Column textAlign="center" width={16}>
          <Grid.Row>
            <Button as={Link}
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      fontDisplay: "optional",
                      fontSize: "20px",
                      color: "white",
                      border: "none",
                      marginTop: "50px",
                      padding: "12px 40px",
                      borderRadius: "50px",
                      background: "#4285F4"
                    }}
                    to={items.to} content={items.button_text}/>
          </Grid.Row>
        </Grid.Column>: <Grid.Column textAlign="center" width={16}/> }
      </Grid.Row>
    </Grid>
  </Segment>);
}

export default MesssageComponent; 
