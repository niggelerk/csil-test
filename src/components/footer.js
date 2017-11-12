import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Button } from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeEditor','storeUIEditor') @observer
class Footer extends React.Component{
  render(){
    const store = this.props.storeEditor, ui = this.props.storeUIEditor

    let footer = null
    if (ui.isFooterShown) {
     footer = <Button shape="circle" icon="delete" className="footer-trash">
      <Dropzone className="dropzone" onDrop={store.deleteItem} />
     </Button>
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
