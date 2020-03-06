import React, { Component } from 'react'
import PlayDB from '../../config/playDB'


// Child Components
import ContentList from '../childComponents/contents/contentList'

// UI Components
import ActionButtons from '../childComponents/contents/ui/actionButtons'


export default class Contents extends Component {
 
  constructor(props){
    super(props)
    this.state = {
      contents : this.props.contents,
      removingList : [],
      ids : [],
      programs : this.props.programs,
      selectedProgram : '',
      index : null,
      programList : [],
      cIndex : null,
      sortedContents:[]
    }
  }
  componentDidMount(){
    let { contents } = this.state
    let sortedContents = new Promise((resolve,reject) => {
      resolve(contents.sort((a,b) => a.created_At.seconds - b.created_At.seconds))
    })
    sortedContents.then(list => this.setState({ sortedContents : list }))
  }
  asyncForEach = async (array, callback) => {
    
    for(var i=0 ; i < array.length ; i++){
      let doc = PlayDB.firestore().collection('contents').doc(`${ array[i].id }`)
      let file = PlayDB.storage().ref('audio').child(`${ array[i].fileName }`)
      console.log('doing')
      await callback( file, doc )
    }
  }
  handleChange = (e) => {
    let { contents, removingList } = this.state
    contents.forEach(item => {
      if(item.id === e.target.id){
        item.isSelected = !item.isSelected
        if(item.isSelected){
          let list = { fileName: item.fileName, id:item.id }
          this.setState((prevState) => {
            return ({ removingList : [ ...prevState.removingList, list ] })
          })
          console.log(this.state.removingList)
        } else {
          let newList = removingList.filter(list => {
            return list.id !== item.id
          })
          this.setState({ removingList : newList })
        }
      }
    })
    this.setState({ contents })
    
  }
  handleDelete = async () => {
     let { removingList, contents, ids } = this.state

    this.asyncForEach(removingList, async (file, doc) => {
       file.delete().then(() => {
        doc.delete()
        console.log('doing2')
      }).catch(console.log)
      
    })
    
    removingList.forEach(listItem => ids.push(listItem.id))
    let newContent = contents.filter(item => !ids.includes(item.id))
    this.setState({
      contents: newContent,
      removingList: [],
      ids: []
    })
    
  }
  handleProgram = (e, content) => {
    let { programs, programList } = this.state
    let programIndex = programs.map(program => program.id).indexOf(e.target.value) // find program info
    let cIndex = programList.map(content => content.contentId).indexOf(content.id)
    let data = {
      contentTitle: content.title,
      contentId: content.id,
      programTitle: programs[programIndex].title,
      programId: e.target.value,
      programImg: programs[programIndex].imageUrl
    }
    if(programList.length === 0 || cIndex === -1) {
      programList.push(data)
    } else {
      programList.splice(cIndex,1)
      programList.push(data)
    }  
    this.setState({ programList })
  }
  handleUpdate = e => {
    e.preventDefault()
    let { contents, programs, programList } = this.state
    // ADD CONTENTS TO PROGRAMS
    programs.map(program => {
      return programList.forEach(list => {

        if(program.id === list.programId){
          let data = {
            title : list.contentTitle,
            id: list.contentId
          }
          program.contents.push(data)

          PlayDB.firestore().collection('programs').doc(program.id).set({
            contents : program.contents
          }, { merge : true })
        }

      })
    })
    contents.map(content => {
      return programList.forEach(list => {
        if(content.id === list.contentId){
          let data = {
            title : list.programTitle,
            id: list.programId,
            imgUrl: list.programImg
          }
          content.program = data 
          PlayDB.firestore().collection('contents').doc(content.id).set({
            program : data
          }, { merge : true })
        }
      })
    })
    this.setState({ programs, contents })
  }
/////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    console.log('This renders from contents')
    let { programs, sortedContents } = this.state 
    
    return (
      <div className="container">
        <ActionButtons 
          updateAction={ this.handleUpdate }
          deleteAction={ this.handleDelete.bind(this)}/>
        <ContentList 
          programs={ programs }
          contents={ sortedContents }
          checkBoxAction={ this.handleChange }
          setProgram={ this.handleProgram }/>
      </div>
      )
  }
}