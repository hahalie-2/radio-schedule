import React from 'react'
import { Input } from 'react-materialize'

const ProgramSelect = ({
    setProgram,
    programList,
    content
}) => {
  return (
    <Input 
      type='select' 
      label="Select Program" 
      defaultValue='1'
      onChange={ e => setProgram(e, content) }>
        <option value=''>Select</option>
            { programList.map((program, index) => {
                return <option key={ index } value={ program.id }>{ program.title }</option>
            })}
    </Input>
  )
}

export default ProgramSelect;