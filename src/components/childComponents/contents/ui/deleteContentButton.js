import React from 'react'
import { Button } from 'react-materialize'

const DeleteContentButton = ({ deleteAction }) => {
  return (
    <>
        <Button style={{ margin: "10px" }} waves='light' onClick={ deleteAction }>Delete</Button>
    </>
  )
}

export default DeleteContentButton;
