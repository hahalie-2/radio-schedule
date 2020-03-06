import React from 'react'
import { Row,Tabs, Tab } from 'react-materialize'

import Search from '../childComponents/schedule/search'
import ContentList from '../childComponents/schedule/contentList'
import ScheduleList from '../childComponents/schedule/scheduleList'




const Schedule = props => {

  const addSchedule = newSchedule => {
    
    return props.addSchedule(newSchedule)
    
  }

  const handleMove = list => {
    return props.handleMove(list)
  }

  

  return (
    <div className="container center">
      <Tabs className='tabs tabs-fixed-width tab-demo z-depth-1'>
        <Tab title="일" active={true}>
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={0}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={0} /> 
          </Row>
        </Tab>
        <Tab title="월">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={1}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={1}/> 
          </Row>
        </Tab>
        <Tab title="화">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={2}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={2} /> 
          </Row>
        </Tab>
        <Tab title="수">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={3}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={3}/> 
          </Row>
        </Tab>
        <Tab title="목">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule }  programs={ props.programs } addSchedule={ addSchedule } day={4}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove }day={4}/> 
          </Row>
        </Tab>
        <Tab title="금">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={5}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={5}/> 
          </Row>
        </Tab>
        <Tab title="토">
          <Search programs={ props.programs }/>
          <Row>
            <ContentList contents={ props.contents } schedule={ props.schedule } programs={ props.programs } addSchedule={ addSchedule } day={6}/>
            <ScheduleList schedule={ props.schedule } listToMove={ props.listToMove } handleMove={ handleMove } day={6}/> 
          </Row>
        </Tab>
    </Tabs>
  </div> 
  )
}

export default Schedule;
  
  






