import React from 'react'
import Dropzone from 'react-dropzone'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Icon, Modal, Spin, Button } from 'antd'

import {observer} from 'mobx-react'
import storeEditor from '../stores/dataStoreEditor'
import storeUIEditor from '../stores/uiStoreEditor'

@observer
class ScrollingEditor extends React.Component {
  render() {
    const ui = storeUIEditor
    return (
     <div className="editor-root">
      <UserItemList />
      <UserItemUploadButton />

      <Modal wrapClassName="vertical-center-modal" visible={ui.isModalVisible} onCancel={ui.closeModalItem} footer={null}>
       <img src={ui.modalItem} style={{width:"100%"}} />
      </Modal>

     </div>
    )
  }
}

@observer
class UserItemList extends React.Component {
  render () {
    const store = storeEditor, ui = storeUIEditor
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

@observer
class UserItem extends React.Component {
  render () {
    const item = this.props.item, ui = storeUIEditor
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

@observer
class UserItemUploadButton extends React.Component {
  render () {
    const store = storeEditor
    return (
      <Button shape="circle" icon="camera-o" className="editor-upload-button">
       <Dropzone className="dropzone" onDrop={store.uploadFile} />
      </Button>
    )
  }
}




export default ScrollingEditor
