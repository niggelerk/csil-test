import React from 'react'
import {observer,inject} from 'mobx-react'

import Header from './header'
import Footer from './footer'


@observer
class Layout extends React.Component {
  render () {
    return (
      <div className="width-100-height-100">
       <Header />
       <div id="content">
        {this.props.children}
       </div>
       <Footer />
      </div>
    )
  }
}

export default Layout
