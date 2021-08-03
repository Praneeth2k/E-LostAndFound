import React, { useState } from 'react'

export default function StepTwo(props){
  return ( 
    <div>
      <div className='row'>
        <div>
          <label className="col-7">Type of object</label>
          <select onChange={props.handleChange} name = "typeob" value={props.typeob} className="col-5" style={{width:"15rem"}}>
            <option value="Electronics">Electronics</option>
            <option value="Stationary">Stationary</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className='row'>
        <div>
          <label className="col-7">Description of object</label>
          <textarea
            className="col-5" 
            placeholder='Description of object'
            name = "descpob"
            onChange={props.handleChange}
            value={props.descpob}
          />
        </div>
      </div>
    </div>
  )
}
