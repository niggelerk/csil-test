import React from 'react'
import Dropzone from 'react-dropzone'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Icon, Modal, Spin, Button } from 'antd'
import {inject,observer} from 'mobx-react'
import { Link } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Layout from './layout'

import T from 'i18n-react'


@inject('storeEditor','storeUIEditor') @observer
class Editor extends React.Component {
  render() {
    const ui = this.props.storeUIEditor
    const isDeleted = this.props.storeEditor.isDeleted

    return(
     <Layout>

      {isDeleted && <DeletedScreen />}

      {!isDeleted &&
       <div className="editor-root disable-selection">
        <UserItemList />
        <UserItemUploadButton />
        <DeleteRiddleButton />

        <Modal wrapClassName="vertical-center-modal" visible={ui.isModalVisible} onCancel={ui.closeModalItem} footer={null}>
         <img src={ui.modalItem} style={{width:"100%"}} alt=""/>
        </Modal>
       </div>
      }

     </Layout>
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
       helperClass='sortableHelper'
       pressDelay={100}
       onSortEnd={store.swapItems}
      />
    )
  }
}

@inject('storeUIEditor','storeEditor') @observer
class UserItem extends React.Component {
  render () {
    const item = this.props.item, ui = this.props.storeUIEditor, store = this.props.storeEditor
    const SortableItem = SortableElement( observer(() => {
     return (
       <div
        className="editor-item"
        style={{backgroundImage:"url("+item.url+")"}}
        onClick={ui.showModalItem.bind(this,item.url)}
       >

        <Button type="default" className="item-delete-button" onClick={this.openDeleteModal}> &times; </Button>

        <div className="editor-star-container">
         <Icon type="star" className="editor-star">
          <div className="editor-star-number"> {this.props.index+1} </div>
         </Icon>
        </div>

        <Modal
          title={T.translate("editor.confirmDeletion")}
          visible={ui.deleteModalOpen}
          onOk={this.confirmDeletion.bind(this,item.id)}
          onCancel={ui.handleClosedeleteModal}
          okText={T.translate("general.OK")}
          cancelText={T.translate("general.abort")}
        >
          <p>{T.translate("editor.reallyDelete")}</p>
        </Modal>

       </div>
     )
    }))

    return (
      <SortableItem index={this.props.index} />
    )
 }


 openDeleteModal = (e) => {
   e.stopPropagation()
   this.props.storeUIEditor.handleOpendeleteModal()
 }

 confirmDeletion (id) {
   this.props.storeUIEditor.handleClosedeleteModal()
   this.props.storeEditor.deleteItem(id)
 }

}

@inject('storeEditor') @observer
class DeleteRiddleButton extends React.Component {
  render () {
    const store = this.props.storeEditor
    return (
      <Button shape="circle" icon="delete" className="riddle-delete-button" onClick={store.deleteRiddle} />
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


@inject('storeEditor', 'storeUIEditor') @observer
class DeletedScreen extends React.Component {
  render(){
    return (
      <div className="width-100-height-100">
       <div className="editor-root disable-selection">
        <div className="editor-wrapper editor-delete-container">

         <img src ="/public/image/garbage.png" alt="deletedRiddle"/>
         <Button type = "default" size='large' onClick={this.createNewRiddle}> {T.translate("editor.createNewRiddle")} </Button>

        </div>
       </div>
      </div>
    )
  }

  createNewRiddle = () => {
    this.props.storeEditor.checkRiddle()
  }

 }

export default Editor
