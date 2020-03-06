import React from 'react'
import EditModal from './editModal'

const ProgramCard = ({ program }) => {
  return (
        <>
            <h4 className="header">{ program.title }</h4>
            <div className="card horizontal" style={{ paddingLeft : "24px" }}>
                <div className="card-image" style={{ paddingTop : "24px" }}>
                    <img style={{ width: "155px", height: "auto", marginTop: "0.5rem"}} src={ program.imageUrl } alt={ program.title }/>
                    <div className="card-action center">
                        <EditModal program={ program }/>
                    </div>
                </div>      
            </div>
        </>
  )
}

export default ProgramCard;