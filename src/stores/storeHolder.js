import DataStoreEditor from './dataStoreEditor'
import UIStoreEditor from './uiStoreEditor'

const storeUIEditor = new UIStoreEditor()
const storeEditor = new DataStoreEditor(storeUIEditor)

const storeHolder =  {
  editor: {
    ui: storeUIEditor,
    data: storeEditor
  }
}

export default storeHolder
