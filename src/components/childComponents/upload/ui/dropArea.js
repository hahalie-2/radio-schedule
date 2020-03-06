import React from 'react'
import { Row, Col, CardPanel } from 'react-materialize'

export default function DropArea(props) {
  return (
    <Row>
        <Col s={ 12 }>
            <CardPanel 
              className="teal lighten-4 black-text" 
              style={{ height : "300px", padding: "0" }}>
                <input 
                  type="file" 
                  multiple 
                  accept="audio/mpeg" 
                  style={{ width: "100%", height: "100%"}} 
                  onDrop={ props.drop }/>
            </CardPanel>
        </Col>
    </Row>
  )
}
