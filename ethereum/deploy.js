const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')


const provider = new HDWalletProvider(
    'almost scissors drama opera regular gallery orange atom train cabin typical camp',
    'https://rinkeby.infura.io/v3/064f600f88634127927e0d2c59c1d800'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' })
    console.log('Contract deployed to', result.options.address)
    provider.engine.stop()
}

deploy();