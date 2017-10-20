import React from 'react'
import Dropzone from 'react-dropzone'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Icon, Modal, Spin, Button } from 'antd'
import {inject,observer} from 'mobx-react'

@inject('storeEditor','storeUIEditor') @observer
class Editor extends React.Component {
  render() {
    const ui = this.props.storeUIEditor
    return (
     <div className="editor-root">
      <UserItemList />
      <UserItemUploadButton />

      <Modal wrapClassName="vertical-center-modal" visible={ui.isModalVisible} onCancel={ui.closeModalItem} footer={null}>
       <img src={ui.modalItem} style={{width:"100%"}} alt=""/>
      </Modal>

     </div>
    )
  }

  componentWillMount () {
    this.props.storeEditor.setHistory(this.props.history)
    this.props.storeEditor.checkRiddle()
  }
}

@inject('storeUIEditor','storeEditor') @observer
class UserItemList extends React.Component {
  render () {
    const ui = this.props.storeUIEditor, store = this.props.storeEditor
    const SortableList = SortableContainer( observer(() => {
      return (
        <div className="editor-wrapper">
          {store.items.map((item, index) => (
           <UserItem key={index} index={index} item={item} />
          ))
         }
         {ui.isItemLoading &&
          <div className="editor-item editor-loading">
           <Spin size="large" />
          </div>
         }
        </div>
      )
    } ))

    return (
      <SortableList
       axis="x"
       lockAxis="x"
       helperClass='sortableHelper'
       pressDelay={100}
       onSortEnd={store.swapItems}
      />
    )
  }
}

@inject('storeUIEditor') @observer
class UserItem extends React.Component {
  render () {
    const item = this.props.item, ui = this.props.storeUIEditor
    const SortableItem = SortableElement( observer(() => {
     return (
      <div
       className="editor-item"
       style={{backgroundImage:"url("+item.url+")"}}
       onClick={ui.showModalItem.bind(this,item.url)}
      >
       <div className="editor-star-container">
        <Icon type="star" className="editor-star">
         <div className="editor-star-number"> {this.props.index+1} </div>
        </Icon>
       </div>
      </div>
     )
    }))

    return (
      <SortableItem index={this.props.index} />
    )
 }
}

@inject('storeEditor') @observer
class UserItemUploadButton extends React.Component {
  render () {
    const store = this.props.storeEditor
    return (
      <Button shape="circle" icon="camera-o" className="editor-upload-button">
       <Dropzone className="dropzone" onDrop={store.uploadFile} />
      </Button>
    )
  }
}

export default Editor
