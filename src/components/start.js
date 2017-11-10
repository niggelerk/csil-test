import React from 'react'
import {
 Link
} from 'react-router-dom'
import {
 Button
} from 'antd'
import {inject,observer} from 'mobx-react'
import Layout from './layout'


@inject('storeUIEditor','storeEditor') @observer
class Start extends React.Component {
 render() {
  return (
    <Layout>

     <Link to="/editor">
      <Button type = "default" size='large'> Zum Editor </Button>
     </Link>

     <Link to="/game">
      <Button type="primary" size='large'> Zum Game </Button>
     </Link>

   </Layout>
  )
 }
}
export default Start
