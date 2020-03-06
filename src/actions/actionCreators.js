import { GET_REPLAY_DATA } from './types'
import PlayDB from '../config/playDB'

export const getData = data => {
    return {
        type: GET_REPLAY_DATA,
        data
    }
}

export const fetchReplayData = () => {
    return (dispatch) => {
        return PlayDB.firestore().collection('replay').get()
                        .then(snapshot => {
                            let replayList = [];
                            snapshot.docs.forEach(doc => {
                                let content = {...doc.data(), id: doc.id }
                                replayList.push(content)
                            })
                            replayList.sort((a,b) => {
                                if (a.programTitle < b.programTitle)
                                    return -1;
                                if (a.programTitle > b.programTitle)
                                    return 1;
                                return 0;
                            })
                            return replayList
                        }).then(data => dispatch(getData(data)))
    }
}