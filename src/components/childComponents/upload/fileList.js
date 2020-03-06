import React from 'react'
import { Row, Col } from 'react-materialize'
import File from './file'

export default function FileList(props) {
    return (
    <Row>
        <Col s={ 12 }>
            <File files={ props.files } progress={ props.progress }/>
        </Col>
    </Row>
  )
}