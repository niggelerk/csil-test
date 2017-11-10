import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Button } from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeEditor','storeUIEditor') @observer
class Footer extends React.Component{
  render(){
    const store = this.props.storeEditor
    return(
      <Button shape="circle" icon="delete" className="footer-trash">
       <Dropzone className="dropzone" onDrop={store.deleteItem} />
      </Button>
    )
  }

  componentWillMount () {
    if (window.location.pathname === "/editor") {
      this.props.storeUIEditor.hideFooter()
    }
  }

}

export default Footer
