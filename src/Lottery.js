import web3 from './web3'

const address = 'rinkyaddressfromdeployedLotterysolproject'

const abi =
[{ interfaceCodeFromLotterysol: [] 
}]

export default new web3.eth.Contract(abi, address);