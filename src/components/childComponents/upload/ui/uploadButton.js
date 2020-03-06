import React from 'react'
import { Row, Button } from 'react-materialize'

export default function UploadButton(props) {
  return (
    <Row>
        <Button onClick={ props.upload }>Upload</Button>
    </Row>
  )
}