import { observable,action } from 'mobx'

class UIStoreEditor {
 @observable isModalVisible = false
 @observable isItemLoading = false
 @observable modalItem
 @observable deleteModalOpen = false

 @action.bound toggleItemLoading () {
   this.isItemLoading = !this.isItemLoading
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

}

export default UIStoreEditor
