import React, { Component } from 'react'
import { Row, Input } from 'react-materialize'
import PlayDB from '../../../config/playDB'


export default class ReplayList extends Component {

    state = {
        selectedValue: null,
        startIndex:null,
        listToAction:[],
        currentIndex: null,
        replay: this.props.replay,
        isChecked: false,
        playList:[],
        listToMove:[],
        title:''
    }

    componentDidMount(){
      let { playList } = this.state
      this.state.replay.contents.map(content => {
        return playList.push(content)
      })

      this.setState({ playList, title: playList[0].programTitle })
      console.log(playList)
    }
    handleDragStart = (e, content, contentIndex) => {
  
        console.log(`Start index: ${ contentIndex }`)
        e.dataTransfer.setData("text", content)
        this.setState({ selectedValue : content, startIndex: contentIndex })
        
        
    }
    handleDragEnter = (e, contentIndex) => {
      
        let { selectedValue, startIndex, playList } = this.state
        
        console.log(contentIndex)
        
          e.currentTarget.style.border = "3px dotted red"
          
          playList.splice(startIndex, 1)
          playList.splice(contentIndex, 0, selectedValue)
        
        
        this.setState({ startIndex: contentIndex })
        
    }
    handleDragLeave = e => {
        e.currentTarget.style.border = ""
        
    }
    handleChange = (e, content, contentIndex) => {
        let { listToAction, scheduleList } = this.state
        let currentContent = scheduleList[contentIndex]
        
        let index = listToAction.map(list => list.contentId).indexOf(content.contentId)
        
        
        if(e.target.checked) {
          listToAction.push(content)
          currentContent.isChecked = true
        } else {
          listToAction.splice(index,1)
          currentContent.isChecked = false
        }  
        
        this.setState({ listToAction })
    }
    handleUpdate = e => {
         let { playList, replay } = this.state
         
           playList.map(content => {
             return content.onReplay = false
           })
           console.log(playList)

         let selectedProgram = replay.id
        
         PlayDB.firestore().collection('replay').doc(selectedProgram).set({
           contents : playList
         }, { merge : true }).then(alert("Update is Complete!"))
     }
    handleSelectAll = e => {
      
        let { listToAction, scheduleList } = this.state
        
        if(e.target.checked) {
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
    changeTitle = e => {
      this.setState({ title : e.target.value })
    }

  render() {
    
    let list = this.state.playList.map((content, contentIndex) => {
        return (
        <tr
              className="z-depth-2" 
              key={ contentIndex }
              draggable
              onDragStart={ e => this.handleDragStart(e, content, contentIndex) }
              onDragLeave={ e => this.handleDragLeave(e, content, contentIndex) }
              onDragEnter={ e => this.handleDragEnter(e, contentIndex) }
              >
                <td>{ contentIndex+1}</td>
                  <td>{ content.title }</td>
                  <td>{ content.fileName}</td>
              </tr>
          )
    }).reverse()

    return (
      <>
        <Row style={{ padding: "1.75em"}}>
        
        <Input s={6} label="Program Title" validate defaultValue={ this.state.title } onChange={ this.changeTitle }/>
            <button style={{ display: "block", float:"right"}} className="waves-effect waves-light btn green" onClick={ this.handleUpdate }><i className="material-icons left">cloud_upload</i>Update</button>
        </Row>
        <Row style={{ padding: "0 1.75em"}}>
        <table className="highlight responsive-table">
              <thead>
                <tr>
                    <th>
                      <label>
                        <input 
                          type="checkbox"  
                          className="filled-in"
                          onChange={ this.handleSelectAll }
                          
                        /><span style={{ display : "inherit" }}></span>
                      </label>
                    </th>
                    <th>Title</th>
                    <th>File Name</th>
                </tr>
              </thead>
              <tbody>{ list }</tbody>
          </table>
        </Row>    
      </>
    )
  }
}