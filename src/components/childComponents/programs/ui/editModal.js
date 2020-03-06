import React, { PureComponent } from 'react'
import { Modal, Button, Row, Col } from 'react-materialize'

// Child Components
import ContentTitles from '../contentTitles'

export default class EditModal extends PureComponent {
  render() {
    let { program } = this.props
    return (
        <Modal
        modalOptions={{ complete : this.handleTest }}
        header={ program.title }
        fixedFooter
        trigger={ <Button>Edit</Button> }>
          <div className="container">
              <div className="center">
                  <img src={ program.imageUrl } alt="A demo media box1"  width="30%"/>
              </div>
              <Row>
                  <Col s={12}>
                      <ul className="collection with-header">
                          <li className="collection-header">
                              <h4>Program Information 
                                  <Button floating className='red right' waves='light' icon='edit' />
                              </h4>
                          </li>
                          <li className="collection-item">Title : { program.title }</li>
                          <li className="collection-item">Thumbnail Image: { program.image }</li>
                          <li className="collection-item">Created At : </li>
                          <li className="collection-item"># of Contents : { program.contents.length }</li>
                          <li className="collection-item">Time : </li>
                          <li className="collection-item">Description : </li>
                      </ul>
                  </Col>
              </Row>
              <Row>
                  <Col s={12}>
                      <ul className="collection with-header">
                          <li className="collection-header">
                              <h4>Contents</h4>
                          </li>
                          { program.contents && program.contents.map((content, index) => {
                                                    return <ContentTitles key={ index }content={ content } />
                                                })}
                      </ul>
                  </Col>
              </Row>
          </div>
      </Modal>
    )
  }
}
