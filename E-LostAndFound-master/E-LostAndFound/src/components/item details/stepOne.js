import React, { useState, useEffect } from 'react';

export default function StepOne(props) {
  
  return (
    <div className="container">
      <div className='row'>
        <div>
          <label className="col-7">Your Name</label>
          <input
            className="col-5"
            placeholder='Your Name'
            type='text'
            name = "YourName"
            onChange={props.handleChange}
            value={props.YourName}
            autoFocus
            style={{width:"15rem"}}
          />
        </div>
      </div>
      <div className='row'>
        <div>
          <label className="col-7">Object Name</label>
          <input
            className="col-5"
            placeholder='Object Name'
            type='text'
            name = "ObjectName"
            onChange={props.handleChange}
            value={props.ObjectName}
            style={{width:"15rem"}}
          />
        </div>
      </div>
      <div className='row'>
        <div>
          <label className="col-6">Where you found/Lost</label>
          <input
            className="col-6"
            placeholder='Place'
            type='text'
            name = "Place"
            onChange={props.handleChange}
            value={props.place}
            style={{width:"15rem"}}
          />
        </div>
      </div>
    </div>
  )
}