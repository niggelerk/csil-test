import { observable,action } from 'mobx'

class UIStoreEditor {
 @observable isModalVisible = false
 @observable isItemLoading = false
 @observable modalItem

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

}

export default UIStoreEditor
