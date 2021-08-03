import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import map from "../images/map.jpg"
const Map = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" onClick={toggle} style = {{marginLeft: "3em"}}>BMSCE map</Button>
      <Modal isOpen={modal} toggle={toggle} style = {{maxWidth: "60em"}}className="BMSCE-map">
        <img src = {map} style = {{width:"100%", height:"100%"}} alt = 'bmsce map'/>
      </Modal>
    </div>
  );
}

export default Map;