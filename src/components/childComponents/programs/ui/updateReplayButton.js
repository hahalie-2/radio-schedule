import React from 'react'
import { Button } from 'react-materialize'

export default function UpdateReplayButton(props) {
  return (
    <Button waves='light' onClick={ props.updateAction }>Update Replays</Button>
  )
}