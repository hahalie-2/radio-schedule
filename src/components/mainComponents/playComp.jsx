import React, { Component } from 'react'
import PlayDB from '../../config/playDB'
import { connect } from 'react-redux'
import playButton from '../../assets/play_sq2.svg'
import pauseButton from '../../assets/pause_sq2.svg'

import pauseButtonBlack from '../../assets/pause_black.svg'
import playButtonBlack from '../../assets/play_black.svg'

import { Tabs, Tab } from 'react-materialize'
import './playComp.css'

// ChildCoponents
import Live from '../childComponents/play/live'
import Replay from '../childComponents/play/replay'


export class PlayComp extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentContent: null,
      urlToPlay:null,
      duration: null,
      position: 0,
      audio: new Audio(),
      keepPlaying: false,
      schedule: [],
      isShow: false,
      imgUrl:"",
      index:0,
      remainingContents:[],
      replay:null,
      past:null,
      onReplay: false,
      today: new Date().getDay(),
      timeZ: new Date().getTimezoneOffset(),
      currentT: (new Date().getTime())%86400000,
      replay:[]
    }
  }
  
  componentDidMount() {

      PlayDB.firestore().collection('replay').get()
      .then(snapshot => {
          let replayList =[]
              snapshot.docs.forEach(doc => {
                  let data = { ...doc.data(), id:doc.id }
                  replayList.push(data)
              })
          replayList.sort((a,b) => {
              if(a.title < b.title) {
              return -1
              } if(a.title > b.title) {
              return 1
              } return 0
          })
      return replayList
      }).then(replay => this.setState({ replay }))
  
    
    
    this.getContents()
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.index !== nextState.index 
    || this.state.isShow !== nextState.isShow 
    || this.state.currentContent !== nextState.currentContent 
    || this.state.replayButton !== nextState.replayButton
    || this.state.replay !== nextState.replay
  }
  getContents = () => {
    new Promise(resolve => {
      let data = {}
      let currentTime = new Date().getTime()
      data.today = new Date().getDay()
      
      data.timeZone = new Date().getTimezoneOffset()

      data.past = (currentTime%86400000) - (data.timeZone*60000)

      if(data.past < 0) {
        data.past += 86400000
      } else if(data.past > 86400000) {
        data.past -= 86400000
      }

      data.setTime = (data.past - 21600000 + (data.timeZone*60000)) / 1000
        if(data.setTime < 0) {
          data.setTime += 86400
        }


        let selectedSeconds = data.past
// if DaylightSaving == true
//        let zoneFactor = Math.abs(data.timeZone * 60000)

        let zoneFactor = Math.abs(data.timeZone * 72000)

        let zoneFactorMinus = selectedSeconds - zoneFactor
        let zoneFactorPlus = selectedSeconds + zoneFactor
        console.log(selectedSeconds)
        if(data.timeZone <= 0){
          if(selectedSeconds < zoneFactor) {
            selectedSeconds += 86400000
            if(zoneFactorMinus >= 36000000 && zoneFactorMinus <= 86400000) {
              data.today -= 1
            }
          } else if(selectedSeconds === zoneFactor) {
            data.today -= 1
          } else {
            if(zoneFactorMinus < 21600000 && zoneFactorMinus >= 0) {
              data.today -= 1
            }
          }
        } else if(data.timeZone > 0 && data.timeZone <= 360){
          if(zoneFactorPlus >= 36000000 && zoneFactorPlus < 21600000){
            data.today -= 1
          }
        } else {
          if(zoneFactorPlus - 86400000 > 21600000 && zoneFactorPlus - 86400000 < 43200000) {
            data.today += 1
          }
        }
        resolve(data) 
      }).then(data => {
        
        let passedData = data 
        PlayDB.firestore().collection('schedule').where('day',"==", passedData.today).get()
          .then(snapshot => {
            let schedule = []
            snapshot.docs.forEach(doc => {
                let data = { ...passedData, ...doc.data(), id:doc.id, isActive: "" }
                schedule.push(data)
            })
            
      return { user : null, schedule }
      })
      .then(data => {
        PlayDB.firestore().collection('replay').get().then(snapshot => {
          var replay = []
          snapshot.docs.forEach(doc => {
            replay.push(doc.data())
          })
          return {...data, replay }
        })
      .then(data => {
        
        let passedData = data
        let currentDuration = 0

        if(passedData.schedule[0].daylightSaving) {
          passedData.schedule[0].setTime += 3600
        } 

        passedData.remainingContents = []
        passedData.schedule[0].contents.map(content => {
          currentDuration += content.duration
          content.currentDuration = currentDuration

          
            if (content.currentDuration > passedData.schedule[0].setTime) {
            return passedData.remainingContents.push(content)
          }
       
        })

        return passedData

      }).then(data => {
        
        if(data.remainingContents.length !== 0) {
          let current = data.remainingContents[0]
             this.setState({
               past: data.schedule[0].past,
               //replay: data.replay,
               currentContent: current.contentTitle,
               urlToPlay: current.url,
               position: current.duration - (current.currentDuration - data.schedule[0].setTime),
               remainingContents: data.remainingContents,
               imgUrl: current.programImg
             })
        }
      })
    })
    })
  }
  handlePlay = e => {
    let { isShow, audio, position, urlToPlay, index,remainingContents } = this.state

    if(isShow) {
      this.setState({ isShow: false, keepPlaying: false, index:0 })
      audio.pause()
    } else {
      this.setState({ isShow : true, keepPlaying: false, index:0 })
      this.getContents()
      audio.src = urlToPlay
      audio.currentTime = position
      audio.play()

      audio.onended = () => {
        index++
        let current = remainingContents[index]
        this.setState({ 
          index,
          keepPlaying : true,
          currentContent: current.contentTitle,
          urlToPlay: current.url,
          imgUrl: current.programImg
        })
      }
    }
  }
  handleReplay = (e, pTitle, onReplay, url, index) => {
    let { audio, replay } = this.state
    let i = replay.map(program => program.programTitle).indexOf(pTitle)
    let i2 = replay[i].contents.map(content => content.url).indexOf(url)
    let content = replay[i].contents[i2]
    
    if(onReplay) {
      audio.pause()
      content.onReplay = false
      this.setState({ replay, replayButton: playButtonBlack })
    } else {
      audio.pause()
      content.onReplay = true
      audio.src = url
      
      audio.play()
      console.log(audio)
      this.setState({ replay, replayButton: pauseButtonBlack })
    }

  }
  render() {
    console.log(this.state.schedule)
    let { remainingContents, keepPlaying, index, audio, urlToPlay, replay, replayButton } = this.state
    let current = remainingContents[index]

    if(keepPlaying) {
      audio.src = urlToPlay
      audio.play()

       current.onended = () => {
        index++
        this.setState({ 
          index,
          currentContent: current.contentTitle,
          urlToPlay: current.url,
          imgUrl: current.programImg
        })
      }
    }
    var image = null
    this.state.isShow ? image = pauseButton : image = playButton
    return (
      <Tabs className='tabs-fixed-width z-depth-1 grey darken-3' style={{ overflowX:"hidden"}}>
        <Tab title="LIVE" active className='tabText'>
      <Live 
      contentImage={ this.state.imgUrl}
      contentTitle={ this.state.currentContent}
      playAction={ this.handlePlay}
      playImage={ image }/>
         </Tab>
         <Tab title="다시듣기" className='tabText'>
           { 
            replay && replay.map((program, index) => {
              return <Replay program={ program } key={ index } onReplay={ this.handleReplay } buttonImage={ replayButton }/>
            })
          }
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps,null)(PlayComp);