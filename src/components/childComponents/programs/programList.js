import React from 'react'
import { Row, Col } from 'react-materialize'

// UI Components
import ProgramCard from './ui/programCard'

const ProgramList = ({ programs }) => { 
    return (
        <Row className="container">
            {
                programs && programs.map((program, index) => {
                    return (
                        <Col s={12} key={index}>
                            <ProgramCard program={ program }/>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
export default ProgramList;