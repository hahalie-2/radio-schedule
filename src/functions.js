import React, { PureComponent } from 'react'
import Programs from './components/mainComponents/programs'

export default class Functions extends PureComponent {

    handleTest = () => {
        console.log("Function Test")
    }

  render() {
    return (
      <Programs handleTest={ this.handleTest }/>
    )
  }
}
