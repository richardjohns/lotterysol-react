import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
// import Lottery from './Lottery';

class App extends Component {
  state = {
    manager: ''
  };
  // constructor(props) {
  //   super(props)

  //   this.state = { manager: '' };
  // }

  componentDidMount() {
    // don't need to add 'from: account[0]' as provider already has the default account added.
    // const manager = await Lottery.methods.manager().call()

    // this.setState({ manager })
  }

  render() {
    console.log('Using web3 version: ',web3.version);
    web3.eth.getAccounts().then(console.log);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <div>
          <h2>Lottery Contract</h2>
          <p>The contract is managed by: {this.state.manager}</p>
        </div>

      </div>
    );
  }
}

export default App;
