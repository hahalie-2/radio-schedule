import React, { Component } from 'react'
import { Col } from 'react-materialize'

export default class ContentList extends Component {

    state = {
        selectedArray: [],
        schedule: this.props.schedule,
        background: "",
    }

    handleAddition = e => {
      e.preventDefault()
        let { selectedArray, schedule } = this.state 
        
        selectedArray.forEach(content => schedule[this.props.day].contents.push(content))
        
        this.props.addSchedule(schedule)
        this.setState({ selectedArray : [], background: "" })
        
      }
  
    handleSelect = (e, selectedData) => {
        let { selectedArray } = this.state
        console.log(selectedData)
        if(e.currentTarget.style.background !== "grey") {
          e.currentTarget.style.background = "grey"
          selectedArray.push(selectedData)
        } else {
          e.currentTarget.style.background = ""
          selectedArray.splice(selectedArray.indexOf(selectedData), 1)
        }
        
          this.setState({ selectedArray })
    }

  render() {
    console.log("this text is from render")
    let list = this.props.contents.sort((a,b) => b.created_At.seconds - a.created_At.seconds).map((content, index) => {
            
            let word = content.created_At.toDate().toString().split(" ")
            let title = content.title
            let item = {
                runTime: content.runTime,
                duration: content.duration,
                contentTitle: content.title,
                contentId: content.id,
                url: content.url,
                isChecked: false,
                fileName: content.fileName
            }
            if(content.program === null){
              item.programTitle = ""
            } 
            // else {
            //   let index = this.props.programs.map(program => program.id).indexOf(content.id)
            // }
              item.programTitle = content.program.title
              item.programId = content.program.id
              item.programImg = content.program.imgUrl
              
        return (
            <tr
              className="z-depth-2"
              key={ index }
              onClick={ e => this.handleSelect(e, item) }
              name={ title }
              style={{ background: this.state.background }}>
                <td>{ content.runTime }</td>
                <td>{ content.program.title }</td>
                <td>{ title }</td>
                <td>{ content.fileName }</td>
                <td>{word[1]}/{word[2]}/{word[3]}</td>
            </tr>
            )
        })
        
        return (
            <Col s={12} m={6} style={{ borderRight : "1px solid #edeff2"}}>
              <button className="waves-effect waves-light btn orange darken-2" style={{ left : "30%" }} onClick={ this.handleAddition }><i className="material-icons left">note_add</i>Add</button>
              <table className="highlight responsive-table">
                <thead>
                  <tr> 
                    <th>RT</th>
                    <th>Program</th>
                    <th>Title</th>
                    <th>File</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>{ list }</tbody>
              </table>
              </Col>
            
            
        )
  }
}