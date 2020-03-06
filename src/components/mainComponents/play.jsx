import React, { Component } from 'react'


export default class Play extends Component {

  state = {
    time: (new Date().getTime())%86400000,
    current: null,
    contents:[],
    remainingContents: [],
    currentDuration:0,
    start:0,
    end:0,
    past:0,
    currentContent: null,
    urlToPlay:null,
    duration: null,
    position: 0,
    audio: new Audio(),
    disable: false,
    volume:0.5,
    today: new Date().getDay(),
    currentSchedule:[],
    schedule: this.props.schedule
  }

  componentDidMount() {
    this.getTime.then(info => this.getDurations(info))
  }

  getTime = new Promise(resolve => {
    let today = new Date().getDay()
    let time = (new Date().getTime())%86400000
    let GMT06_Minus = 43200000
    let past = 0
    if(this.state.schedule[today].daylightSaving){
      

      if(time < GMT06_Minus) {
        past = (68400000 + time) / 1000
      } else {
        past = (time - 18000000) / 1000
      }
    } else {
      

      if(time < GMT06_Minus) {
        past = (64800000 + time) / 1000
      } else {
        past = (time - 21600000) / 1000
      }
    }
    

    



    resolve({ time, past, today })
    })

  getDurations = info => {
    let { schedule, currentDuration, remainingContents } = this.state
    let past = info.past
    let today = info.today
    let time = info.time
          
    new Promise(resolve => {
      schedule[today].contents.map(content => {
        let duration = content.duration
        currentDuration += duration
        content.currentDuration = currentDuration
      if(currentDuration > past) {
        return remainingContents.push(content)
      } else {
        return null
      }
    })
    console.log(remainingContents)
    resolve(remainingContents)
  })
    .then(data => {
        if(data.length === 0){
          
          alert("No contents in today's schedule. Please check the schedule!")
        } else {
          let current = data[0]
          this.setState({
            currentContent: current.contentTitle,
            urlToPlay: current.url,
            duration: current.duration,
            position: current.duration - (current.currentDuration - past),
            past,
            time
          }) 
        }
      })
  }


  render() {
    return (
      <div>
        <audio onLoadedData={ e => e.target.currentTime = this.state.position } controls src={ this.state.urlToPlay }></audio>
      </div>
    )
  }
}