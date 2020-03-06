import React from 'react'

// UI Components
import ProgramSelect from '../contents/ui/programSelect'
import DeleteCheckBox from '../contents/ui/deleteCheckBox'

const ContentInfo = ({
    content,
    index,
    handleProgram,
    checkBox,
    programs
}) => {
  return (
    <>
        <tr key={ content.id }>
            <td>{ index }</td>
            <td>{ content.fileName }</td>
            <td>{ content.title }</td>
            <td>{ content.runTime }</td>
            <td>{ content.size }</td>
            <td>{ content.program === null ? 
                <ProgramSelect content={ content } setProgram={ handleProgram } programList={ programs }/>
                : 
                <span>{ content.program.title }</span> }
            </td>
            <td>
              <DeleteCheckBox id={ content.id } deleteChecked={ checkBox }/> 
            </td>
        </tr>
    </>
  )
}

export default ContentInfo;
