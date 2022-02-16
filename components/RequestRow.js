import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import CampaignInstance from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class RequestRow extends Component {

    onApprove = async event => {
        event.preventDefault()
        const campaign = CampaignInstance(this.props.address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    onFinalize = async event => {
        event.preventDefault()
        const campaign = CampaignInstance(this.props.address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render() {
        const { id, request, approversCount } = this.props;
        const readytoFinalize = request.approvalCount > approversCount / 2
        return (
            <Table.Row disabled={request.complete} positive={readytoFinalize && !request.complete}>
                <Table.Cell>
                    {id}
                </Table.Cell>
                <Table.Cell>
                    {request.description}
                </Table.Cell>
                <Table.Cell>
                    {web3.utils.fromWei(request.value, 'ether')}
                </Table.Cell>
                <Table.Cell>
                    {request.recipient}
                </Table.Cell>
                <Table.Cell>
                    {request.approvalCount}/{approversCount}
                </Table.Cell>
                <Table.Cell>
                    {
                        request.complete ? null : (
                            <Button onClick={this.onApprove} color='green' basic>
                                Approve
                            </Button>)
                    }
                </Table.Cell>

                <Table.Cell>
                    {
                        request.complete ? null : (
                            <Button onClick={this.onFinalize} color='teal' basic>
                                Finalize
                            </Button>)
                    }
                </Table.Cell>

            </Table.Row>
        )
    }
}

export default RequestRow