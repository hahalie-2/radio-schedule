import React, { Component } from 'react'
import { Col, Input } from 'react-materialize'

export default class TitleInfo extends Component {
    handleTitle = (e,file) => {
        file.title = e.target.value
    }
  
    render() {

    const { file } = this.props
    
    return (
        <Col s={3}>
            <Input onChange={ e => this.handleTitle(e, file) } label="Enter Title" required/>
        </Col> 
    )
  }
}
