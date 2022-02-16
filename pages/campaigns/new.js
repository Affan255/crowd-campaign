import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class NewCampaign extends Component {

    state = {
        minimumContribution: '',
        errorMsg: '',
        loading: false
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ minimumContribution: event.target.value })
    }

    handleSubmit = async (event) => {
        this.setState({ loading: true, errorMsg: '' })
        event.preventDefault()
        const accounts = await web3.eth.getAccounts()
        try {
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            })
            Router.pushRoute('/')
        } catch (err) {
            this.setState({ errorMsg: err.message })
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <h3>Create a campaign!</h3>
                <Form onSubmit={this.handleSubmit} error={!!this.state.errorMsg}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            value={this.state.minimumContribution}
                            label='Wei' labelPosition='right'
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Message error header='Oops!' content={this.state.errorMsg} />
                    <Button
                        loading={this.state.loading}
                        type='submit'
                        primary>Create</Button>
                </Form>

            </Layout>
        )
    }
}


export default NewCampaign
