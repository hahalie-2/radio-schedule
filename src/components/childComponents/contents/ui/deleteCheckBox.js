import React from 'react'


const DeleteCheckBox = ({
    id,
    deleteChecked,
    selected
}) => {
  return (
    <label>
        <input 
          type="checkbox" 
          id={ id } 
          className="filled-in" 
          checked={ selected } 
          onChange={ deleteChecked }/>
      <span></span>
    </label>
  )
}

export default DeleteCheckBox;
