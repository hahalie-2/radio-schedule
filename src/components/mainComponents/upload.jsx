import React, { Component } from 'react'
import PlayDB from '../../config/playDB'

// Child Components
import FileList from '../childComponents/upload/fileList'

// UI Components
import UploadButton from '../childComponents/upload/ui/uploadButton'
import DropArea from '../childComponents/upload/ui/dropArea'


export default class Upload extends Component {

state = {
      fileList : [],
      progress : 0,
      selectedValue: '',
      programs:this.props.programs,
      isComplete:'',
      title:''
}
handleDrop = e => {
    e.preventDefault();

    let fileNames = [...e.dataTransfer.files]


    fileNames.map(file => {
      file.title = ''
      return this.setState((prevState) => {
        return ({ fileList : [...prevState.fileList, file] })
    })
  })
}
handleUpload = e => {
      e.preventDefault()
      // Get file
      let { fileList } = this.state
      let titles = []
      let titleCheck = new Promise(resolve => {
          fileList.map(file => titles.push(file.title))
          resolve(titles)
      })

      titleCheck.then(titles => {
        if(titles.includes("")){
          alert('Please fill the title(s)')
        } else {
          let db = PlayDB.firestore()
          fileList.forEach(file => {
                // Get Fileinfo
                let { size, type, name, title } = file
                              
                  // Create Storage ref
                  let fileRef = PlayDB.storage().ref('audio').child(`${ name }`)
                  // Upload file
                  let task = fileRef.put(file)
                  //Update progress bar
                  task.on('state_changed',
                    snapshot => {
                        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        this.setState(() => {
                          return { progress }
                        })
                    },
                    err => {
                      console.log("Error :", err)
                    },
                    () => {
                      fileRef.getDownloadURL().then(url => {
                                    let audio = new Audio(url)
                                    audio.oncanplaythrough = () => {
                                      let duration = audio.duration
                                      let seconds = Math.floor(duration)
                                      let sec = seconds%60
                                      let min = (seconds - sec) / 60
                                      
                                      if(min >= 60) {
                                        let newMin = min%60
                                        let hour = (min - newMin) / 60
                                        let runTime = `${ hour }:${ newMin }:${ sec }`
                    
                                        db.collection('contents').add({ title, fileName: name, duration, runTime, size, type, url, created_At: new Date(), isSelected: false, program: null }) 
                                      } else {
                                        let runTime = `${ min }:${ sec }`
                                        db.collection('contents').add({ title, fileName: name, duration, runTime, size, type, url, created_At: new Date(), isSelected: false, program: null })
                                      }
                                    }
                                  }).then(() => alert("COMPLETE!"))   
                    }
                  )
      })
    }
  })
    
}
handleSelect = e => {
    this.setState({ selectedValue: e.target.value })
    console.log(this.state.selectedValue)
}
  //////////////////////////////////////////////////////////////////////////////////////////
    render() {
    let { fileList, progress } = this.state
    return (
      <div className="center container">
        <DropArea drop={ this.handleDrop }/>
        <UploadButton upload={ this.handleUpload }/>
        <FileList files={ fileList } progress={ progress }/>
      </div>
    )
  }
}