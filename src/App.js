import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PlayDB from './config/playDB'

import Navbar from './navbar'


import Schedule from './components/mainComponents/schedule.jsx'
import Contents from './components/mainComponents/contents.jsx'
import Upload from './components/mainComponents/upload.jsx'
import Programs from './components/mainComponents/programs.jsx'
import Auth from './components/mainComponents/auth.jsx'
import PlayComp from './components/mainComponents/playComp.jsx'
import Replay from './components/mainComponents/replay'

import Test from './components/test'
import PlayComp2 from './components/mainComponents/playComp2.jsx'
import Play from './components/mainComponents/play.jsx'

export default class App extends Component {
    state = {
        user: null,
        contents: [],
        programs: [],
        schedule: [],
        listToMove: [],
        replay: []
    }
    componentDidMount() {
        PlayDB.auth().onAuthStateChanged(user => {
            user ?
                PlayDB.firestore().collection('contents').get()
                    .then(snapshot => {
                        let list = []
                        snapshot.docs.forEach(doc => {
                            let data = { ...doc.data(), id: doc.id, isChecked: false }
                            list.push(data)
                        })
                        return list.sort((a, b) => b.created_At.seconds - a.created_At.seconds)
                    })
                    .then(list => {
                        let sortedContents = list
                        PlayDB.firestore().collection('programs').get()
                            .then(snapshot => {
                                let programList = []
                                snapshot.docs.forEach(doc => {
                                    let data = { ...doc.data(), id: doc.id }
                                    programList.push(data)
                                })
                                programList.sort((a, b) => {
                                    if (a.title < b.title) {
                                        return -1
                                    } if (a.title > b.title) {
                                        return 1
                                    } return 0
                                })
                                return { contents: sortedContents, programs: programList }
                            })
                            .then(data => {
                                let passedData = data
                                PlayDB.firestore().collection('schedule').get()
                                    .then(snapshot => {
                                        let schedule = []
                                        snapshot.docs.forEach(doc => {
                                            let data = { ...doc.data(), id: doc.id, isActive: "" }
                                            schedule.push(data)
                                        })
                                        schedule.sort((a, b) => a.day - b.day)
                                        this.setState({
                                            contents: passedData.contents,
                                            programs: passedData.programs,
                                            schedule, user
                                        })
                                    })
                            })
                    })
                :
                this.setState({ user: null })
        })
    }
    addSchedule = schedule => {
        this.setState({ schedule })
    }
    handleMove = list => {
        this.setState({ listToMove: list })
    }

    render() {
        let { user, contents, programs, schedule, listToMove, replay } = this.state
        return (
            <BrowserRouter basename="/radio">
                {user ?
                    <div>
                        <Navbar />
                        <Switch>
                            <Route
                                exact
                                path='/test'
                                render={props => <PlayComp2 {...props} />}
                            />
                            <Route
                                exact path='/'
                                render={props =>
                                    <Play {...props}
                                        schedule={schedule}
                                    />
                                }
                            />
                            <Route
                                path='/schedule'
                                render={props =>
                                    <Schedule {...props}
                                        contents={contents}
                                        schedule={schedule}
                                        programs={programs}
                                        addSchedule={this.addSchedule}
                                        listToMove={listToMove}
                                        handleMove={this.handleMove}
                                    />
                                }
                            />
                            <Route
                                path='/replay'
                                render={props =>
                                    <Replay {...props}
                                        listToMove={listToMove}
                                        handleMove={this.handleMove}
                                    />
                                }
                            />
                            <Route
                                path='/contents'
                                render={props =>
                                    <Contents {...props}
                                        contents={contents}
                                        programs={programs}
                                    />
                                }
                            />
                            <Route
                                path='/upload'
                                render={props =>
                                    <Upload {...props}
                                        programs={programs}
                                    />
                                }
                            />
                            <Route
                                exact path='/programs'
                                render={props =>
                                    <Programs {...props}
                                        contents={contents}
                                        programs={programs}
                                    />
                                }
                            />

                        </Switch>
                    </div>
                    :
                    <div>
                        <Switch>
                            <Route exact path='/admin' component={Auth} />
                            <Route exact path='/play'
                                render={props =>
                                    <PlayComp {...props}
                                        replay={replay}
                                    />
                                }
                            />
                        </Switch>
                    </div>
                }

            </BrowserRouter>


        )
    }
}