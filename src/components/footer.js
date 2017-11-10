import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Button } from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeEditor','storeUIEditor') @observer
class Footer extends React.Component{
  render () {
    const ui = this.props.storeUIEditor
    let footer = null
    if (ui.isFooterShown) {
      footer = <div style={{position:"fixed"}}> Footer </div>
    }
    return ( footer )
  }

  componentWillMount () {
    const ui = this.props.storeUIEditor

    if (window.location.pathname === '/editor') {
      ui.hideFooter()
    } else ui.showFooter()
  }

}

export default Footer
