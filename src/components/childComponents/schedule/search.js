import React, { Component } from 'react'
import { Row, Col, Collapsible, CollapsibleItem, Input } from 'react-materialize'

export default class Search extends Component {
  
  state = {
    selectedProgram: null
  }
  handleProgramList = e => {
    this.setState({ selectedProgram : e.target.value })
  }

  render() {

    let programOptions = this.props.programs.map((program, index) => {
      return (
        <option key={ index } value={program.id}>{program.title}</option>
      )
    })

    return (
      <Row style={{ marginBottom : "0", marginTop : "20px"}}>
        <Col s={12}>
          <Collapsible>
            <CollapsibleItem header='Search' icon='search'>
              <div className="row">
                <Input s={12} type='select' label="Search by Programs" defaultValue='' onChange={ this.handleProgramList }>
                  <option disabled value="">Select</option>
                    { programOptions }
                </Input>
                <div className="input-field col s12"><i className="material-icons prefix">insert_drive_file</i>
                  <input id="icon_prefix" type="text" className="validate"/>
                    <label htmlFor="icon_prefix">Search By Contents</label>
                </div>
              </div>
            </CollapsibleItem>
          </Collapsible>
        </Col> 
      </Row>
    )
  }
}