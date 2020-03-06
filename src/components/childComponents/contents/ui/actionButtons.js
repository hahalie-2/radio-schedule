import React from 'react'
import { Row } from 'react-materialize'

// UI Components
import UpdateProgramButton from './updateProgramButton'
import DeleteContentButton from './deleteContentButton'

const ActionButtons = ({
    updateAction,
    deleteAction
}) => {

  return (
    <Row className="right" style={{ padding: "10px"}}>
        <UpdateProgramButton update={ updateAction }/>
        <DeleteContentButton delete={ deleteAction }/>
    </Row>
  )
}

export default ActionButtons;
