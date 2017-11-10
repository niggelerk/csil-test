import React from 'react'
import Layout from './layout'
import { observer,inject } from 'mobx-react'

@observer
class Game extends React.Component{
  render(){
    return (
      <Layout>
       <p>gugguseli-game</p>
      </Layout>
    )
  }
}

export default Game
