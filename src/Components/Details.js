import React, {Component} from 'react';
import {connect} from "react-redux";
import {Item} from 'semantic-ui-react'


class Details extends Component {

    render() {
        let PersonDetails = this.props.clientSearch
        if (this.props.clientPicked) {
            let clientNumber = this.props.clientPicked;
            let clientInfo = PersonDetails[clientNumber]
            // console.log('NUMBER' + clientNumber)
            // console.log(PersonDetails)
            return (
                <div className="details-block">
                    <h1>Details</h1>
                    <Item.Group>
                        <Item>
                            <Item.Image className="details-image" size='small' src={clientInfo.general.avatar}/>

                            <Item.Content>
                                <Item.Header
                                    as='a'>{clientInfo.general.firstName} {clientInfo.general.lastName}</Item.Header>
                                <Item.Description>
                                    <p>JOB</p>
                                    <p>{clientInfo.company}</p>
                                    <p>{clientInfo.title}</p>
                                    <p>CONTACTS</p>
                                    <p>{clientInfo.contact.email}</p>
                                    <p>{clientInfo.contact.phone}</p>
                                    <p>
                                        ADDRESS
                                    </p>
                                    <p>{clientInfo.address.address}</p>
                                    <p>{clientInfo.address.city}</p>
                                    <p>{clientInfo.address.zipCode}</p>
                                    <p>{clientInfo.address.country}</p>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>
            );
        } else {
            return (
                <div className='details-block'>
                    <h1>Details</h1>
                    <h1>NO MATCH</h1>
                </div>
            );
        }
    }
}

export default connect(
    state => ({
        clientList: state.clientList,
        clientSearch: state.clientSearch,
        clientPicked: state.clientPicked
    }),
)(Details);