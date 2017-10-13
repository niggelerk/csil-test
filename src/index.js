import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Start from './components/start'
import ScrollingEditor from './components/nicotest'
import Game from './components/game'
import {
 BrowserRouter,
 Switch,
 Route
} from 'react-router-dom'

class App extends React.Component {
 render() {
  return (
   <BrowserRouter>
    <Switch>
     <Route exact path='/' component={Start} />
     <Route path='/editor' component={ScrollingEditor} />
     <Route path='/game' component={Game}/>
    </Switch>
   </BrowserRouter>
  )
 }
}

ReactDOM.render( < App / > , document.getElementById('app'))
