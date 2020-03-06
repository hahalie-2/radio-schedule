import React, { Component } from 'react'
import { Col } from 'react-materialize'
import PlayDB from '../../../config/playDB'


export default class ScheduleList extends Component {

  state = {
    selectedValue: null,
    startIndex: null,
    listToAction: [],
    currentIndex: null,
    schedule: this.props.schedule,
    isChecked: false,
    scheduleList: [],
    listToMove: []

  }

  componentDidMount() {
    let { scheduleList } = this.state
    let today = new Date().getDay()
    this.state.schedule[this.props.day].contents.map(content => {
      return scheduleList.push(content)
    })

    this.setState({ currentIndex: today, scheduleList })
  }
  handleDragStart = (e, content, contentIndex) => {

    console.log(`Start index: ${contentIndex}`)
    e.dataTransfer.setData("text", content)
    this.setState({ selectedValue: content, startIndex: contentIndex })

  }
  handleDragEnter = (e, contentIndex) => {

    let { selectedValue, startIndex, scheduleList } = this.state
    console.log(`Entered index: ${contentIndex}`)
    e.currentTarget.style.border = "3px dotted red"

    scheduleList.splice(startIndex, 1)
    scheduleList.splice(contentIndex, 0, selectedValue)


    this.setState({ startIndex: contentIndex })

  }
  handleDragLeave = e => {
    e.currentTarget.style.border = ""

  }
  handleChange = (e, content, contentIndex) => {
    let { listToAction, scheduleList } = this.state
    let currentContent = scheduleList[contentIndex]

    let index = listToAction.map(list => list.contentId).indexOf(content.contentId)


    if (e.target.checked) {
      listToAction.push(content)
      currentContent.isChecked = true
    } else {
      listToAction.splice(index, 1)
      currentContent.isChecked = false
    }

    this.setState({ listToAction })
  }
  handleUpdate = e => {
    let { scheduleList, schedule } = this.state


    let selectedSchedule = schedule[this.props.day].id
    scheduleList.map(content => content.isChecked = false)

    PlayDB.firestore().collection('schedule').doc(selectedSchedule).set({
      contents: scheduleList
    }, { merge: true }).then(alert("Update is Complete!"))
  }
  handleSelectAll = e => {

    let { listToAction, scheduleList } = this.state

    if (e.target.checked) {
      scheduleList.map(content => {
        content.isChecked = true
        return listToAction.push(content)
      })
    } else {
      scheduleList.map(content => {
        return content.isChecked = false
      })
      listToAction = []
    }

    this.setState({ listToAction })
  }
  handlePaste = e => {
    let { scheduleList } = this.state
    this.props.listToMove.length === 0 ? alert('Select content(s) to paste')
      :
      this.props.listToMove.map(list => {
        return scheduleList.push(list)
      })
    this.setState({ scheduleList })

  }
  handleRemove = e => {
    let { listToAction, scheduleList } = this.state

    if (listToAction.length === 0) {
      alert("Select item(s) to remove")
    } else {

      let a = scheduleList.filter(list => list.isChecked === false)

      this.setState({ scheduleList: a })

    }
  }
  handleCopy = () => {
    let { listToAction } = this.state
    listToAction.length === 0 ? alert('Select content(s) to copy')
      :
      this.props.handleMove(listToAction)
    this.setState({ listToAction: [] })


  }


  render() {
    console.log("this text is from render")
    let start = 0
    let end = 0


    let list = this.state.scheduleList.map((content, contentIndex) => {
      var currentIndex = this.props.day
      start = end
      let startSeconds = Math.floor(start)

      end += content.duration


      let endSeconds = Math.floor(end)

      let startSec = startSeconds % 60
      let startMin = (startSeconds - startSec) / 60
      let endSec = endSeconds % 60
      let endMin = (endSeconds - endSec) / 60

      if (startMin < 60 && endMin < 60) {
        var startTime = `${startMin}:${startSec}`;
        var endTime = `${endMin}:${endSec}`;
      } else if (startMin < 60 && endMin >= 60) {
        var newEndMin = endMin % 60
        var endHour = (endMin - newEndMin) / 60

        startTime = `${startMin}:${startSec}`;
        endTime = `${endHour}:${newEndMin}:${endSec}`;
      } else if (startMin >= 60 && endMin < 60) {
        let newStartMin = startMin % 60
        var startHour = (startMin - newStartMin) / 60

        startTime = `${startHour}:${newStartMin}:${startSec}`;
        endTime = `${endMin}:${endSec}`;
      } else {
        let newStartMin = startMin % 60
        let startHour = (startMin - newStartMin) / 60
        let newEndMin = endMin % 60
        let endHour = (endMin - newEndMin) / 60

        startTime = `${startHour}:${newStartMin}:${startSec}`;
        endTime = `${endHour}:${newEndMin}:${endSec}`;
      }

      return (
        <tr
          className="z-depth-2"
          key={contentIndex}
          draggable
          onDragStart={e => this.handleDragStart(e, content, contentIndex)}
          onDragLeave={e => this.handleDragLeave(e, content, contentIndex)}
          onDragEnter={e => this.handleDragEnter(e, contentIndex)}
        >
          <td>
            <label>
              <input
                type="checkbox"
                className="filled-in"
                onChange={e => this.handleChange(e, content, contentIndex)}
                checked={content.isChecked}
              /><span style={{ display: "inherit" }}></span>
            </label>
          </td>
          <td>{content.runTime}</td>
          <td>{startTime}</td>
          <td>{endTime}</td>
          <td>{content.programTitle}</td>
          <td>{content.fileName}</td>
        </tr>
      )
    })

    return (
      <Col s={12} m={6}>
        <button className="waves-effect waves-light btn green" style={{ left: "30%" }} onClick={this.handleUpdate}><i className="material-icons left">cloud_upload</i>Update</button>
        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="filled-in"
                    onChange={this.handleSelectAll}
                  /><span style={{ display: "inherit" }}></span>
                </label>
              </th>
              <th>RT</th>
              <th>Start</th>
              <th>End</th>
              <th>Program</th>
              <th>File Name</th>
            </tr>
          </thead>
          <tbody>{list}
          </tbody>
        </table>
        <div className="fixed-action-btn">
          <button className="btn-floating btn-large red">
            <i className="large material-icons">mode_edit</i>
          </button>
          <ul>
            <li><button className="btn-floating red" onClick={this.handleRemove}><i className="material-icons">delete</i></button></li>
            <li><button className="btn-floating yellow darken-1" onClick={this.handlePaste}><i className="material-icons">content_paste</i></button></li>
            <li><button className="btn-floating blue" onClick={this.handleCopy}><i className="material-icons">content_copy</i></button></li>
          </ul>
        </div>
      </Col>
    )
  }
}