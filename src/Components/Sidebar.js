import React, {Component} from 'react';
import SingleContact from './SingleContact'
import {connect} from "react-redux";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noMatch: false
        }
    }

    handleSearch(event) {
        console.log(this);

        const searchText = event.target.value.toLowerCase();
        let displayClients = this.props.clientList.filter(function (el) {
            let searchName = el.general.firstName.toLowerCase();
            let searchLastName = el.general.lastName.toLowerCase();
            return (searchName.indexOf(searchText) !== -1 || searchLastName.indexOf(searchText) !== -1)
        });
        // console.log(displayClients);
        this.props.onListUpdate(displayClients)
        this.props.onClientPicked(false)

        if (displayClients.length == 0) {
            this.setState({
                    noMatch: true
                }
            )
        }
    }

    render() {

        let listItems = []
        let clientsArray = this.props.clientList;
        let contentUpdated = this.props.clientSearch;
        console.log(this.state.clientSearch);
        // console.log('CONTENT UPDATE LIST LENGTH' + contentUpdated.length)
        console.log(contentUpdated)

        if (contentUpdated.length > 0) {
            clientsArray = contentUpdated;
            listItems = clientsArray.map((client, b) =>
                <SingleContact key={b} posno={b} firstName={client.general.firstName} lastName={client.general.lastName}
                               avatar={client.general.avatar}/>
            )
        } else if (clientsArray.length > 0 && this.state.noMatch == false) {
            listItems = clientsArray.map((client, b) =>
                <SingleContact key={b} posno={b} firstName={client.general.firstName} lastName={client.general.lastName}
                               avatar={client.general.avatar}/>
            )
        }
        return (
            <div className='sidebar'>
                <div className='sideBar-search-block'>
                    <input className='sideBar-search-input' type="text"
                           onChange={this.handleSearch.bind(this)}/>
                    <span>search</span>
                </div>
                <ul className="sidebar-client-list">
                    {listItems}
                </ul>
            </div>
        );
    }
}


export default connect(
    state => ({
        clientList: state.clientList,
        clientSearch: state.clientSearch,
        clientPicked: state.clientPicked

    }),
    dispatch => ({
        onListUpdate: (array) => {
            dispatch({type: 'LIST_UPDATE', payload: array})
        },
        onClientPicked: (array) => {
            dispatch({type: 'CLIENT_PICKED', payload: array})
        }
    })
)(Sidebar);