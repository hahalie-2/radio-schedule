import React, { Component } from 'react'
import PlayDB from '../../config/playDB'
import { connect } from'react-redux'



// UI Components
import UpdateReplayButton from '../childComponents/programs/ui/updateReplayButton'
import CreateProgramModal from '../childComponents/programs/ui/createProgramModal'

// Child Components
import ProgramList from '../childComponents/programs/programList'

export class Programs extends Component {
    
    
    state = {
        programs: this.props.programs,
        title: '',
        image:null,
        isShow: "none",
        isModalOpen: false,
        unassigned: [],
        contents:this.props.contents,
        replay: this.props.data,
        selectedFromUnassigned:[],
        selectedFromProgram:[],
        contentList:[],
    }
    handleModal = e => {
        e.preventDefault()
        this.setState({ isModalOpen : true })
    }
    handleTitle = e => {
        this.setState({ title : e.target.value})
    }
    handleImage = e => {
         this.setState({ image : e.target.files[0]})
    }
    handleTest = () => {
        console.log('test')
    }
    handleCreate = e => {
        e.preventDefault()
        let { image } = this.state
        
        let fileRef = PlayDB.storage().ref('images').child(`${ image.name }`)
        let task = fileRef.put(image)
        

        task.on('state_changed',
          () => {
              this.setState({ isShow: "block"})
          },
          err => {
            console.log("Error :", err)
          },
          () => {
              let { title, image } = this.state
            fileRef.getDownloadURL().then(url => {
                PlayDB.firestore().collection('programs').add({
                    title,
                    image : image.name,
                    imageUrl : url,
                    created_At: new Date(),
                    contents: []
                }).then(() => {
                    PlayDB.firestore().collection('programs').get().then(snapshot => {
                        
                        snapshot.docs.forEach(program => {
                            this.setState({ programs : [...this.state.programs, program.data()], isModalOpen : false, isShow: "none" })
                        })
                    })
                })
            })
        })
    }
    handleSelectedContents = e => {
        if(!e.target.style.background) {
            e.target.style.background = "rgba(242,242,242,0.5)"
        } else {
            e.target.style.background = ""
        }
        
    }
    handleSelectedUnassigned = (e, content) => {
        let { selectedFromUnassigned } = this.state
        if(!e.target.style.background) {
            e.target.style.background = "rgba(242,242,242,0.5)"
            let item = { title: content.title, id: content.id }
            selectedFromUnassigned.push(item)
        } else {
            e.target.style.background = ""
            selectedFromUnassigned.splice(selectedFromUnassigned.indexOf(content.title), 1)
        }
        this.setState({ selectedFromUnassigned })
    }
    handleRemoveFromList = e => {  ///// LEFT    
    }
    handleAddtoList = (e, program) => { ///// RIGHT
        e.preventDefault()
        let { selectedFromUnassigned, programs } = this.state
                
        //program.contents = selectedFromUnassigned
        let index = programs.map(program => program.title).indexOf(program.title)
        programs[index].contents = selectedFromUnassigned
        this.setState({ programs, contentList : programs[index].contents })
    }
    handleProgram = (program) => {
        console.log(program)
    }
    handleUpdate = () => {
        let { programs, replay, contents } = this.state

        new Promise(resolve => {
            let filteredContents = []
                contents.map(content => {
                    let data = { 
                        programTitle: content.program.title,
                        fileName: content.fileName,
                        title: content.title, 
                        url: content.url }

                    return filteredContents.push(data)
                })
            resolve(filteredContents)
            }).then(filteredContents => {
                let updatedList = programs.filter(program => program.replay === true)
                                          .map(program => { return filteredContents.filter(content => content.programTitle === program.title)
                                  })
                return updatedList
        }).then(updatedList => {

            console.log(updatedList)
            if(replay.length === 0){   
                updatedList.map(lists => {
                    return PlayDB
                              .firestore()
                              .collection('replay')
                              .doc()
                              .set({ 
                                  programTitle: lists[0].programTitle,
                                  contents: lists })
                              .then(() => { return alert(`${ lists[0].programTitle } is added`)})})
            } else {
                
                replay.sort((a,b) => {
                    if (a.programTitle < b.programTitle)
                        return -1;
                    if (a.programTitle > b.programTitle)
                        return 1;
                    return 0;
                }).map(program => {
                    return updatedList.map(lists => {
                        return () => {
                            if(lists[0].programTitle === program.programTitle){
                                return PlayDB
                                   .firestore()
                                   .collection('replay')
                                   .doc(`${ program.id }`)
                                   .update({ contents: lists })
                                   .then(() => { return alert(`${ program.programTitle } is updated`) })
                                 }
                                }
                             })
                         })
             }
        })

    }

  render() {
    console.log('This renders from programs')
    let { programs } = this.state

    return (
        <div>
            <UpdateReplayButton 
              updateAction={ this.handleUpdate }/>
            <CreateProgramModal 
              openModal={ this.state.isModalOpen }
              createTitle={ this.handleTitle }
              createImage={ this.handleImage }
              createProgram={ this.handleCreate }
              showPreloader={ this.state.isShow }/>
            <ProgramList 
                programs={ programs }/>
        </div>  
    )
  }
}

const mapStateToProps = state => {
    return {
      data: state.data
    }
  }
  
  export default connect(mapStateToProps,null)(Programs);