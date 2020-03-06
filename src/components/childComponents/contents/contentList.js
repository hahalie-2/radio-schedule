import React from 'react'

// Child Components
import ContentInfo from './contentInfo'

const ContentList = ({ 
    contents,
    programs,
    checkBoxAction,
    setProgram }) => {
  return (
    <table className="striped centered">
        <thead>
            <tr>
                <th>Number</th>
                <th>File Name</th>
                <th>Title</th>
                <th>Run Time</th>
                <th>Size</th>
                <th>Program</th>
                <th>Delete?</th> 
            </tr>
        </thead>
        <tbody>{
            contents.map((doc, index) => {
                return (
                    <ContentInfo 
                      content={ doc }
                      index={ index }
                      handleProgram={ setProgram }
                      programs={ programs }
                      checkBox={ checkBoxAction }
                      key={ index }/>
                  )
            }).reverse()
       }</tbody>
    </table>
  )
}

export default ContentList;
