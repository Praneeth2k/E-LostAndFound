import React, {useState} from "react";
import { Button, Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';


import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import axios from '../../axios';
import { connect } from "react-redux";
import "../../formFileUpload.css";
class UploadItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
      currentStep: 1,
      email:  '',
      name: '',
      place:'',
      dateTime: '',
      typeob: '',
      descp: '',
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }

  onChangeHandler=event=>{
    if(event.target.name == 'file'){
      this.setState({selectedFile: event.target.files[0]})
    }
    this.setState({[event.target.name]: event.target.value}) 
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile);
    data.append('user_id', this.props.userId);
    data.append('email', this.state.email);
    data.append('name', this.state.name);
    data.append('place', this.state.place);
    data.append('dateTime', this.state.dateTime);
    data.append('typeob', this.state.typeob);
    data.append('descp', this.state.descp);
    axios.post("http://localhost:8001/found", data, { 
      // receive two    parameter endpoint url ,form data
    })
    .then(res => { // then print response status
    console.log(res.statusText)
 })
}
_next = () => {
  let currentStep = this.state.currentStep
  currentStep = currentStep >= 2? 3: currentStep + 1
  this.setState({
    currentStep: currentStep
  })
}
  
_prev = () => {
  let currentStep = this.state.currentStep
  currentStep = currentStep <= 1? 1: currentStep - 1
  this.setState({
    currentStep: currentStep
  })
}


/* the functions for our button*/

previousButton() {
let currentStep = this.state.currentStep;
if(currentStep !==1){
  return (
    <button 
      className="btn btn-secondary" 
      type="button" onClick={this._prev}>
    Previous
    </button>
  )
}
return null;
}

nextButton(){
let currentStep = this.state.currentStep;
if(currentStep <3){
  return (
    <button 
      className="btn btn-primary float-right" 
      type="button" onClick={this._next}>
    Next
    </button>        
  )
  }
return null;
} 

  render(){
    return(
      <div align = "center">
        <Button outline onClick={this.toggleModal}>Register an item you have found</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Register a Found item</ModalHeader>
        <ModalBody>
        <React.Fragment>
        <h1 style = {{color:"rgb(123, 123, 197"}}>Register an item you have found!</h1>
        <p>Step {this.state.currentStep} </p> 
        <Form model="registerFoundItem" encType="multipart/form-data">
          {/* 
          render the form steps and pass required props in
          */ }
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.onChangeHandler}
            name={this.state.name}
            email={this.state.email}
            place={this.state.place}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            handleChange={this.onChangeHandler}
            selectedFile={this.state.selectedFile}
            dateTime={this.state.dateTime}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.onChangeHandler}
            type={this.state.type}
            descp={this.state.descp}
          />
          {this.previousButton()}
          {this.nextButton()}
          <button type="submit" onClick={this.onClickHandler} className="btn btn-success btn-block">Submit</button>
          </Form>
        </React.Fragment>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
        />
      <label htmlFor="name">Item Name</label>
          <input
            className="form-control"
            id="name"
            placeholder='Item Name'
            type='text'
            name = "name"
            onChange={props.handleChange}
            value={props.name}
          />
        <label htmlFor="place">Where you found it?</label>
          <input
            className="form-control"
            id="place"
            placeholder='Place'
            type='text'
            name = "place"
            onChange={props.handleChange}
            value={props.place}
          />
  </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group ">
      <div className="files color">
      <Label>Picture of Item (If it is there!)</Label>
      <input type="file" name="file" onChange={props.handleChange}/>
      </div>
      <Label>Enter Date and Time when you have lost this item (approx.)</Label>
      <Datetime />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="typeob">Type of object</label>
          <select onChange={props.handleChange} name = "typeob" value={props.typeob} className="form-control">
            <option value="Electronics">Electronics</option>
            <option value="Stationary">Stationary</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Other">Other</option>
          </select> 
          <label htmlFor="descp">Description of object</label>
          <textarea
            className="form-control" 
            placeholder='Description of object'
            name = "descp"
            onChange={props.handleChange}
            value={props.descp}
          />    
    </div>
    </React.Fragment>
  );
}

function mapStateToProps(state){
  if(state.auth.user){
    return {
      userId: state.auth.user._id
    }
  }
}

export default connect(mapStateToProps, {})(UploadItem);