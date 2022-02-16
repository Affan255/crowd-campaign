import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0xCC10c3C6951B1A0b16180E8409fAb3d4025111C7')


export default instance