import React from 'react'
import {
 Link
} from 'react-router-dom'
import {
 Button
} from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeUIEditor','storeEditor') @observer
class Start extends React.Component {
 render() {
  return (
    <div>

     <Link to="/editor">
      <Button type = "default" size='large'> Zum Editor </Button>
     </Link>

     <Link to="/game">
      <Button type="primary" size='large'> Zum Game </Button>
     </Link>

   </div>
  )
 }
}
export default Start
