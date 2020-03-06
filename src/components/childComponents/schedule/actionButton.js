import React, { Component } from 'react'

export default class ActionButton extends Component {

    state = {
        listToMove: []
    }

    handleRemove = (e, today) => {
        let { listToAction } = this.state 
        if(listToAction.length === 0) {
          alert("Select item(s) to remove")
        } else {
          listToAction.map(content => {
            let index = this.props.schedule[today].contents.map(list => list.contentId).indexOf(content.contentId)
            return this.props.schedule[today].contents.splice(index,1)
          })
          //this.setState({ schedule })
        }
    }
    handleCopy = () => {
       this.props.listToAction.length === 0 ? alert('Select content(s) to copy') : this.setState({ listToMove : this.props.listToAction })
      
    
    }
    handlePaste = e => {
      
        let { listToMove } = this.state
        if(listToMove.length === 0){
          alert('Please select content(s) to paste')
        } else {
          this.props.listToPaste(listToMove)
        } 
    }
  render() {
    let today = new Date().getDay() 
    return (
        <div className="fixed-action-btn">
            <button className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </button>
            <ul>
                <li><button className="btn-floating red" onClick={ e => this.handleRemove(e, today) }><i className="material-icons">delete</i></button></li>
                <li><button className="btn-floating yellow darken-1" onClick={ e => this.handlePaste(e, today) }><i className="material-icons">content_paste</i></button></li>
                <li><button className="btn-floating blue" onClick={ this.handleCopy }><i className="material-icons">content_copy</i></button></li>
            </ul>
        </div>
    )
  }
}
