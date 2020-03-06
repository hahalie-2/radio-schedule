import React, { PureComponent } from 'react'
import { Modal, Button, Row, Col, Input, Preloader } from 'react-materialize' 

export default class CreateProgramModal extends PureComponent {
  render() {
    return (
        <Modal
          open={ this.props.openModal}
          header='Create Program'
          trigger={
            <div className="center">
                <Button onClick={ this.handleModal }>New Program</Button>
            </div>}>
            <Row>
                <Col s={12}>
                    <Input 
                      placeholder="Enter Title" 
                      s={12} 
                      label="Title" 
                      onChange={ this.props.createTitle }/>
                    <Input 
                      placeholder="Choose a thumbnail Image" 
                      s={12} 
                      accept="image/x-png,image/jpeg"
                      type="file" 
                      label="File" 
                      onChange={ this.props.createImage }/>
                    <div className="center">
                        <Button 
                          waves='light' 
                          onClick={ this.props.createProgram }>
                            Add
                        </Button>
                    </div>
                </Col>                    
                <Col 
                  style={{ display : this.props.showPreloader }} 
                  s={12} 
                  className="valign-wrapper">
                    <Preloader size='small'/>
                </Col>    
            </Row>
        </Modal>
    )
  }
}
