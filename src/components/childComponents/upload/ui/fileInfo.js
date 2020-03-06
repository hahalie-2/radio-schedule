import React from 'react'
import { Col, ProgressBar } from 'react-materialize'

const FileInfo = ({ name, progress }) => {
  return (
    <Col s={9}>
      { name }<ProgressBar progress={ progress } />
    </Col>
  )
}

export default FileInfo;