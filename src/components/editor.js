import React from 'react'
import Dropzone from 'react-dropzone'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import { Icon, Modal, Spin, Button } from 'antd'
import {inject,observer} from 'mobx-react'
import { Link } from 'react-router-dom'
import Header from './header'
import Footer from './footer'

@inject('storeEditor','storeUIEditor') @observer
class Editor extends React.Component {
  render() {
    const ui = this.props.storeUIEditor
    const isDeleted = this.props.storeEditor.isDeleted

    return(
      <div>
      {isDeleted && <div className="editor-root"><Header/><DeletedScreen /><Footer/></div>}
      {!isDeleted &&
        <div className="editor-root">
         <div className="header">
          <Header/>
         </div>
         <UserItemList />
         <UserItemUploadButton />
         <DeleteRiddleButton />

         <Modal wrapClassName="vertical-center-modal" visible={ui.isModalVisible} onCancel={ui.closeModalItem} footer={null}>
          <img src={ui.modalItem} style={{width:"100%"}} alt=""/>
         </Modal>
         <div className="footer">
          <Footer/>
         </div>
        </div>
      }
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
       <div className="editor-star-container">
        <Icon type="star" className="editor-star">
         <div className="editor-star-number"> {this.props.index+1} </div>
        </Icon>
       </div>
       <div>
        <Button type="default" className="item-delete-button" onClick ={ui.handleOpendeleteModal}> x </Button>
       </div>
       <div>
       <Modal
         title="Löschen bestätigen"
         visible={ui.deleteModalOpen}
         onOk={this.confirmDeletion.bind(this,item.id)}
       >
         <p>Willst du dieses Bild löschen?</p>
       </Modal>
       </div>

      </div>
     )
    }))

    return (
      <SortableItem index={this.props.index} />
    )
 }



 confirmDeletion (id) {
   this.props.storeUIEditor.handleClosedeleteModal()
   this.props.storeEditor.deleteItem(id)
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

@inject('storeEditor') @observer
class DeletedScreen extends React.Component {
  render(){
    return (
      <div align = "center" >
        <br/><br/><br/><br/>
        <img src ="/public/image/garbage.png" width="50%" />
        <br/><br/><br/><br/><br/>
        <Button type = "default" size='large' onClick={this.dskfdskl}> Neues Rätsel erstellen </Button>
      </div>
    )
  }

 // method does the same like componentWillMount in Editor, but does it by pressing the Button "Neues Rätsel erstellen"
  dskfdskl  = ()  => {
    this.props.storeEditor.checkRiddle( () => {
      this.props.storeEditor.history.push({
        search: '?r='+this.props.storeEditor.shortId
      })
      this.props.storeEditor.isDeleted = false
    })
  }
 }

export default Editor
