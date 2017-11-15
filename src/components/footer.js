import React from 'react'
import {inject,observer} from 'mobx-react'

@inject('storeEditor','storeUIEditor') @observer
class Footer extends React.Component{
  render(){
    const store = this.props.storeEditor, ui = this.props.storeUIEditor

    let footer = null
    if (ui.isFooterShown) {
    }

    return( footer )
  }

  componentWillMount () {
    if (window.location.pathname === "/editor") {
      this.props.storeUIEditor.hideFooter()
    } else {
      this.props.storeUIEditor.showFooter()
    }
  }

}

export default Footer
