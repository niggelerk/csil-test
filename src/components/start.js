import React from 'react'
import ReactDOM from 'react-dom'
import {
 Link
} from 'react-router-dom'
import {
 Icon,
 Button
} from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeUIEditor','storeEditor') @observer
class Start extends React.Component {
 render() {
   const storeEditor = this.props.storeEditor
  return (
    <div>
   <Link to = "/editor" >
    <Button type = "default" size='large' onClick={storeEditor.createNewRiddle} > Zum Editor < /Button>
   </Link>
   <Link to ="/game">
   <Button type = "primary" size='large' > Zum Game </Button>
   </Link>
   </div>
  )
 }
}
export default Start
