import React from 'react'
import { Row,Tabs, Tab } from 'react-materialize'
import { connect } from'react-redux'

import ReplayList from '../childComponents/replay/replayList'




const Replay = props => {

  const handleMove = list => {
    return props.handleMove(list)
  }

  

  return (
    <div className="container center">
      <Tabs className='tabs tabs-fixed-width tab-demo z-depth-1'>
        <Tab title='꿀단지수다방' active={true}>
          <Row>
            <ReplayList replay={ props.program[0] } listToMove={ props.listToMove } handleMove={ handleMove } day={0} /> 
          </Row>
        </Tab>
        <Tab title="은혜의 말씀속으로">
          <Row>
            <ReplayList replay={ props.program[1] } listToMove={ props.listToMove } handleMove={ handleMove } day={1}/> 
          </Row>
        </Tab>
        <Tab title="내게있는 향유옥합">
          <Row>
            <ReplayList replay={ props.program[2] } listToMove={ props.listToMove } handleMove={ handleMove } day={2} /> 
          </Row>
        </Tab>
    </Tabs>
  </div> 
  )
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps,null)(Replay);
  
  






