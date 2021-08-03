import React, { useState } from 'react'

export default function StepFour(props){

  return (
    <div>
      <div className='row'>
        <div className='col-8'>
          <span>By clicking "Accept" I agree that:</span>
          <ul>
            <li>
              I have read and accepted the <a href='#'>User Agreement</a>
            </li>
            <li>
              I have read and accepted the <a href='#'>Privacy Policy</a>
            </li>
            <li>I am a student of BMSCE</li>
          </ul>
          <label>
            <input
              type='checkbox'
              name = "checked"
              checked={props.checked}
              onChange={props.handleChange}
              autoFocus
            />
            <span> Accept </span>{' '}
          </label>
        </div>
      </div>
    </div>
  )
}