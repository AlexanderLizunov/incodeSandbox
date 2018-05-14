import React, {Component} from 'react';
import {connect} from "react-redux";


class Details extends Component {

    render() {
        let PersonDetails = this.props.clientSearch
        console.log(this.props.clientPicked)
        console.log(this.props.clientSearch)
        if (this.props.clientPicked) {
            let clientNumber = this.props.clientPicked;
            let clientInfo = PersonDetails[clientNumber]
            console.log('NUMBER' + clientNumber)
            console.log(PersonDetails)
            return (
                <div className='details-block'>
                    <img src={clientInfo.general.avatar} alt="" className="details-image"/>
                    <h1 className='details-title'>{clientInfo.general.firstName} {clientInfo.general.lastName}</h1>
                    <h2>job</h2>
                    <p> {clientInfo.company}</p>
                    <p> {clientInfo.title}</p>
                    <h2>contact</h2>
                    <p>{clientInfo.contact.email}</p>
                    <p>{clientInfo.contact.phone}</p>
                    <h2>address</h2>
                    <p>{clientInfo.address.address}</p>
                    <p>{clientInfo.address.city}</p>
                    <p>{clientInfo.address.zipCode}</p>
                    <p>{clientInfo.address.country}</p>
                </div>
            );
        } else {
            return (
                <h1>NO MATCH</h1>
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