import React from 'react'
import ReactDOM from 'react-dom'
import {
 Link
} from 'react-router-dom'
import {
 Icon,
 Button
} from 'antd'

class Start extends React.Component {
 render() {
  return (
    <div>
   <Link to = "/editor" >
    <Button type = "default" size='large' > Zum Editor < /Button>
   </Link>
   <Link to ="/game">
   <Button type = "primary" size='large' > Zum Game </Button>
   </Link>
   </div>
  )
 }
}
export default Start
