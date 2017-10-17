import DataStoreEditor from './dataStoreEditor'
import UIStoreEditor from './uiStoreEditor'


const storeUIEditor = new UIStoreEditor()
const storeEditor = new DataStoreEditor(storeUIEditor)

export default {
  editor: {
    ui: storeUIEditor,
    data: storeEditor
  }
}
