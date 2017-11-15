import React from 'react'
import { Button } from 'antd'
import {inject,observer} from 'mobx-react'
import T from 'i18n-react'

@inject('storeUIEditor') @observer
class Header extends React.Component{
  render () {
    const isSettingsOpen = this.props.storeUIEditor.isSettingsOpen

    return(
      <div id="header">
       {!isSettingsOpen && <div><SettingsRiddleButton /></div>}
       {isSettingsOpen && <div><SettingsRiddleButton /><DeleteRiddleButton /></div>}
      </div>
    )
  }
}

@inject('storeEditor','storeUIEditor') @observer
class SettingsRiddleButton extends React.Component {
  render () {
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
      <Button className="riddle-delete-button" onClick={store.deleteRiddle}> {T.translate("editor.deleteRiddle")} </Button>
    )
  }
}

export default Header
