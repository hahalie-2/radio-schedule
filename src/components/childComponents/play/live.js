import React from 'react'
import { Row, Col } from 'react-materialize'

// Images
import radio from '../../../assets/radio.jpg'

const Live = ({
    contentImage,
    contentTitle,
    playAction,
    playImage
}) => {
  return (
    <Row style={{ minHeight:"300px", marginBottom:'0'}}>
          <Col s={12} m={6} className="offset-m3 offset-l3">
           <div 
             className="card-panel grey lighten-5 z-depth-1" 
             style={{ 
                height:"250px",
                width:"300px",
                margin:"10px auto", 
                backgroundImage: `url(${ radio })`, 
                backgroundSize: 'cover', 
                backgroundRepeat: "no-repeat", 
                backgroundPosition: "top center"}}>
               <span 
                  className="white-text" 
                  style={{ 
                    display: "block", 
                    fontSize: "20px", 
                    fontWeight: "300", 
                    position:"absolute",
                    textAlign: "right",
                    width:"285px",
                    padding: "0 20px" }}>Win Radio</span> 
              <Row className="left">
                
                <img src={ contentImage } alt="" className="circle responsive-img" width={100} style={{marginLeft: "40px", marginTop:"20px"}}/>
               
                <span className="white-text" style={{ display: "block", marginTop:"15px", width:"175px", textAlign:"center" }}>{ contentTitle }</span>
                
                <img src={ playImage } onClick={ playAction } alt='play' width={100} height={100} 
                  style={{ 
                    position:"absolute",
                    left:"50%",
                    top:"200px",
                    transform: "translate(-50%, -80%)",
                    opacity:"0.7"}}/>
              </Row>        
            </div>
            <p className="center">가끔 1분정도 소요될 때가 있습니다.</p>
          </Col>
      </Row>
  )
}

export default Live;
