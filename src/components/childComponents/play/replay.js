import React from 'react'
import { Collapsible, CollapsibleItem, Collection, Modal, CollectionItem } from 'react-materialize'

const Replay = ({
    program
}) => {
    console.log(program)
        return (  
            <Collapsible accordion={ false }>
                <CollapsibleItem header={ program.programTitle }>
                    <Collection>
                        { 
                        program.contents.map((content, contentIndex) => {
                                    return ( 
                                    <CollectionItem key={ contentIndex } className="center" style={{ padding: "10px" }}>
                                        <p>{ contentIndex + 1}.{' '}<strong>{ content.title }</strong></p>
                                        <audio src={ content.url } controls="controls" style={{ height:"30px"}}/>
                                    </CollectionItem>
                                    )
                                }).reverse()
                        }
                    </Collection>
                </CollapsibleItem>
            </Collapsible>
            



            // <Collection>
            //         <Modal
            //         trigger={
            //             <CollectionItem className="center valign-wrapper" style={{ padding: "10px", borderBottom: "1px solid #e0e0e0"}}>
            //              <img width={100} src={ program.programImg } alt="" className="responsive-img" style={{ padding: "10px"}}/>{ program.programTitle }
            //             </CollectionItem>}>
                        
            //             <Collection>
            //                 { 
            //                 program.contents.map((content, contentIndex) => {
            //                             return ( 
            //                             <CollectionItem key={ contentIndex } className="center" style={{ padding: "10px" }}>
            //                                 <p>{ contentIndex + 1}.{' '}<strong>{ content.title }</strong></p>
            //                                 <audio src={ content.url} controls="controls" style={{ width: "150px", height:"30px"}}/>
            //                             </CollectionItem>
            //                             )
            //                         }).reverse()
            //                 }
            //             </Collection>
            //         </Modal>
            //     </Collection>
        )
}

export default Replay;