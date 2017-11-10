import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Spin, Button } from 'antd'
import { Link } from 'react-router-dom'
import {inject,observer} from 'mobx-react'

@inject('storeUIEditor') @observer
class Header extends React.Component{
  render () {
    const isSettingsOpen = this.props.storeUIEditor.isSettingsOpen

    return(
      <div>
       {!isSettingsOpen && <div><SettingsRiddleButton /></div>}
       {isSettingsOpen && <div><SettingsRiddleButton /><DeleteRiddleButton /></div>}
      </div>
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

@inject('storeEditor') @observer
class DeleteRiddleButton extends React.Component {
  render () {
    const store = this.props.storeEditor
    return (
      <Button shape="circle" icon="delete" className="riddle-delete-button" onClick={store.deleteRiddle}>
      </Button>
    )
  }
}

export default Header
