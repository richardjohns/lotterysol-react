import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import Lottery from './Lottery';

class App extends Component {
  state = {
    manager: ''
  };
  // above instead of usual 
  // constructor(props) {
  //   super(props)
  //   this.state = { manager: '' };
  // }

  async componentDidMount() {
    // don't need to add 'from: account[0]' as provider already has the default account added.
    const manager = await Lottery.methods.manager().call()
    // ushally wud be 'manager: manager' but for ES6
    this.setState({ manager })
  }

  render() {
    console.log('Using web3 version: ',web3.version);
    web3.eth.getAccounts().then(console.log);

    return (
        <div>
          <h2>Lottery Contract</h2>
          <p>The contract is managed by: {this.state.manager}</p>
        </div>
    );
  }
}

export default App;
