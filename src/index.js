import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Start from './components/start'
import Editor from './components/editor'
import Game from './components/game'
import {
 BrowserRouter,
 Switch,
 Route
} from 'react-router-dom'

import { default as rootStore } from './stores/storeHolder'
import  { observer, Provider } from 'mobx-react'

@observer
class App extends React.Component {
 render() {
  return (
   <BrowserRouter>
    <Provider storeEditor={rootStore.editor.data} storeUIEditor={rootStore.editor.ui} >
     <Switch>
      <Route exact path='/' component={Start} />
      <Route path='/editor' component={Editor} />
      <Route path='/game' component={Game}/>
     </Switch>
    </Provider>
   </BrowserRouter>
  )
 }
}

ReactDOM.render(<App/>, document.getElementById('app'))
