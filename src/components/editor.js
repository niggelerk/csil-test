import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Icon, Modal, Spin, Button } from 'antd'
import {inject,observer} from 'mobx-react'
import Layout from './layout'
import T from 'i18n-react'


@inject('storeEditor','storeUIEditor') @observer
class Editor extends React.Component {
  render() {
    const ui = this.props.storeUIEditor
    const isDeleted = this.props.storeEditor.isDeleted
    const isDraggedForDeletion = this.props.storeUIEditor.isDraggedForDeletion

    return(
     <Layout>

      {isDeleted && <DeletedScreen />}

      {!isDeleted &&
       <div className="editor-root disable-selection">
        <UserItemList />
        <UserItemUploadButton />
        {isDraggedForDeletion && <ItemDelete where={1} />}
        {isDraggedForDeletion && <ItemDelete where={2} />}
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
       onSortMove={store.showDeletion}
       onSortEnd={store.handleSortEnd}
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
        ref={item => this.useritem = item}
        className={"editor-item " + (ui.isDraggedForDeletion ? "grayscale" : "")}
        style={{backgroundImage:"url("+item.url+")"}}
        onClick={ui.showModalItem.bind(this,item.url)}
       >

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

@inject('storeEditor', 'storeUIEditor') @observer
class ItemDelete extends React.Component {
  render () {
    const store = this.props.storeEditor
    const ui = this.props.storeUIEditor

    return (
        <div className ={"item-delete" + this.props.where}/>
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
         <Button type = "default" size='large' onClick={this.createNewRiddle} > {T.translate("editor.createNewRiddle")} </Button>

        </div>
       </div>
      </div>
    )
  }

  createNewRiddle = () => {
    this.props.storeEditor.checkRiddle()
    this.props.storeUIEditor.isSettingsOpen = false
  }

 }

export default Editor
