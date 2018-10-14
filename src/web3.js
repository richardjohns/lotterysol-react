import Web3 from 'web3';
// provider injected by metamask with web3 is preconfigured with account, public / private keys & connected by Rinkby.
// we use this provider and connect to newest version of Web3, disregarding the older version injected by metamask.
const web3 = new Web3(window.web3.currentProvider);

export default web3;