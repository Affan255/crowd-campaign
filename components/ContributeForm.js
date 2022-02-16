import React, { Component } from 'react'
import { Router } from '../routes';
import { Button, Form, Input, Message } from 'semantic-ui-react'
import CampaignInstance from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMsg: '',
        loading: false
    }

    handleSubmit = async event => {
        event.preventDefault();
        const campaign = CampaignInstance(this.props.address)
        try {
            this.setState({ loading: true, errorMsg: '' })
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.replaceRoute(`${this.props.address}`)
        } catch (err) {
            this.setState({ errorMsg: err.message })
        }

        this.setState({ loading: false, value: '' })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} error={!!this.state.errorMsg}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={(event) => this.setState({ value: event.target.value })}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>
                <Message error header='Oops!' content={this.state.errorMsg} />
                <Button type='submit' primary loading={this.state.loading}>
                    Contribute
                </Button>
            </Form>
        )
    }
}

export default ContributeForm