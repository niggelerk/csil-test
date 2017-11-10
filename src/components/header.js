import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Spin, Button } from 'antd'
import { Link } from 'react-router-dom'
import {inject,observer} from 'mobx-react'

class Header extends React.Component{
  render(){
    return(
       <SettingsRiddleButton />
    )
  }
}

@inject('storeEditor','storeUIEditor') @observer
class SettingsRiddleButton extends React.Component {
  render () {
    const store = this.props.storeEditor
    const ui = this.props.storeUIEditor
    return (
      <Button shape="circle" icon="setting" className="riddle-settings-button" onClick = {ui.toggleSettingsOpen}>
      </Button>
    )
  }
}

export default Header
