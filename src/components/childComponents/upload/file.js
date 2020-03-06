import React from 'react'
import { Collection, CollectionItem, Row } from 'react-materialize'

import FileInfo from './ui/fileInfo'
import TitleInfo from './ui/titleInfo';

const File = ({ files, progress }) => {
    return (
        <Collection>
            { files && files.map((file, index) => {
                return (
                    <CollectionItem key={ index }>
                        <Row>
                            <FileInfo name={ file.name } progress={ progress } />
                            <TitleInfo file={ file }/>
                        </Row>
                    </CollectionItem>
                )
            }) }
        </Collection>
    )
}

export default File;