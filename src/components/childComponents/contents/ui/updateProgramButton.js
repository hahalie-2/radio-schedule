import React from 'react'
import { Button } from 'react-materialize'

const UpdateProgramButton = ({ update }) => {
  return (
    <>
        <Button style={{ margin: "10px" }} waves='light' onClick={ update }>Update Program</Button>
    </>
  )
}

export default UpdateProgramButton;