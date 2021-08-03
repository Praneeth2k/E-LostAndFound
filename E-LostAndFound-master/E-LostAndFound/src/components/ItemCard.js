import React, { useState, useContext } from "react";
import {useHistory} from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Popover, PopoverHeader, PopoverBody
  } from 'reactstrap';

import "./ItemCard.css"
import {ThemeContext} from "./themeContext"
function ItemCard(props) {
  const {theme} = useContext(ThemeContext)
  const history = useHistory();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const buttonForFound = <Button onClick = {() => history.push(`/found/${props.id}`)}>Claim</Button>
  const buttonForLost = <Button onClick = {() => history.push(`/lost/${props.id}`)}>Already Found</Button>
  if (props.flag == 3){
    return (
      <div style = {{paddingTop:"2em"}} >
      <Card className = {theme === "dark"? "darkThemeCard": "lightThemeCard"} >
        <CardImg top width="100%" src = {props.img} alt="Card image cap"/>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.type}</CardSubtitle>
          <CardText>{props.desc}</CardText>
          
          <Button id="Popover1" type="button">
              Claim
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
              <PopoverHeader>E mail sent</PopoverHeader>
              <PopoverBody>The person who found your item has been informed.</PopoverBody>
            </Popover>
              </CardBody>
      </Card>
    </div> 
    )
  }
    return (
    <div style = {{paddingTop:"2em"}} >
      <Card className = {theme === "dark"? "darkThemeCard": "lightThemeCard"}>
      {/* <img src = {`data:image/png;base64,${this.state.picture}`} />  */}
        <CardImg top width="100%" src = {`data:image/png;base64,${props.img}`} alt="Card image cap"/>
        
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardText> {props.type}</CardText>
          {/* <CardText>Description: {props.desc}</CardText> */}
          
          <Button onClick = {() => history.push(`/${props.flag==0? "found": "lost"}/${props.id}`)}>{props.flag == 0 ? "Claim":"Already Found"}</Button>
        </CardBody>
      </Card>
    </div> 
    
    )
}
export default ItemCard;