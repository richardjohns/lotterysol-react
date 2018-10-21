import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import Lottery from './Lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    // note balance is not a number
    balance: '',
    value: '',
    notification: ''
  };
  // above instead of usual
  // constructor(props) {
  //   super(props)
  //   this.state = { manager: '' };
  // }

  async componentDidMount() {
    // don't need to add 'from: account[0]' as provider already has the default account added.
    
    const manager = await Lottery.methods.manager().call()
    const players = await Lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(Lottery.options.address)

    // ushally wud be 'manager: manager' but for ES6
    this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    // don't have to worry about binding this for functions in createreactapp
    event.preventDefault()
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'})
    await Lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({ message: 'You have been entered!!'})
  }

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'})

    // this.setState({ message: 'Waiting on transaction success...'})
    await Lottery.methods.pickWinner().send({
      // ie from source account or account picking winner.
      from: accounts[0],
    })
    this.setState({ message: 'A winner has been picked!!'})
  }

  render() {
    console.log('Using web3 version: ',web3.version);
    console.log('web3address: ',Lottery.address)
    // console.log('Lotteryaddress: ',web3.utils.checkAddressChecksum(Lottery.address))

    web3.eth.getAccounts().then(console.log);
    // web3.utils.checkAddressChecksum(Lottery.address).then(console.log);


    return (
      <div>
        <div>
          <h2>Lottery Contract</h2>
          <p>The contract is managed by: {this.state.manager}  </p>
          <p>There are currently {this.state.players.length} people entered,</p>
          <p>competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ETH.</p>
        </div>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of Ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <div>
          <p>Ready to pick a winner?</p>
          <button onClick={this.onClick}>Pick a winner!</button>
        </div>

        <div>
          <p>{this.state.message}</p>
        </div>

      </div>
    );
  }
}

export default App;
