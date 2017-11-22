import { observable,action } from 'mobx'

class UIStoreEditor {
 @observable isModalVisible = false
 @observable isItemLoading = false
 @observable modalItem
 @observable deleteModalOpen = false
 @observable isFooterShown = true
 @observable isSettingsOpen = false
 @observable isDraggedForDeletion = false

 @action.bound toggleItemLoading () {
   this.isItemLoading = !this.isItemLoading
 }

 @action.bound toggleSettingsOpen() {
   this.isSettingsOpen = !this.isSettingsOpen
 }

 @action.bound showItemDelete() {
   this.isDraggedForDeletion = true
 }

 @action.bound hideItemDelete() {
   this.isDraggedForDeletion = false
 }

 @action.bound showModalItem (modalItem) {
   this.isModalVisible = true
   this.modalItem = modalItem
 }

 @action.bound closeModalItem () {
   this.isModalVisible = false
 }

 @action.bound handleOpendeleteModal () {
   this.deleteModalOpen = true
 }

 @action.bound handleClosedeleteModal () {
   this.deleteModalOpen = false
 }

 @action.bound showFooter () {
   this.isFooterShown = true
 }

@action.bound hideFooter () {
  this.isFooterShown = false
}

}

export default UIStoreEditor
