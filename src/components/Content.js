import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderBook from './OrderBook'
// import { Tabs, Tab } from 'react-bootstrap'
import Trades from './Trades'
import MyTransactions from './MyTransactions'
import PriceChart from './PriceChart'
import Balance from './Balance'
import NewOrder from './NewOrder'
import {exchangeSelector} from '../store/selectors'
import { loadAllOrders, subscribeToEvents } from '../store/interactions'

class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const {exchange, dispatch} = props
    await loadAllOrders(exchange, dispatch)
    await subscribeToEvents(exchange, dispatch)
  }

  render() {
    return (
      <div className="content">
        <div className ="vertical-split">
          <Balance />
          <NewOrder />
        </div>
        <OrderBook />
        <div className="vertical-split">
          <PriceChart />
          <MyTransactions />
        </div>
        <Trades />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: exchangeSelector(state)
  }
}

export default connect(mapStateToProps)(Content);