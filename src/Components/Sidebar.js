import React, {Component} from 'react';
import SingleContact from './SingleContact'
import {connect} from "react-redux";
import {Input, Icon, List} from 'semantic-ui-react'


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noMatch: false
        }
    }

    handleSearch(event) {
        const searchText = event.target.value.toLowerCase();
        let displayClients = this.props.clientList.filter(function (el) {
            let control = false
            for (var key in el) {
                const sublist = el[key];
                for (var subKey in sublist) {
                    if (sublist[subKey].toLowerCase().indexOf(searchText) !== -1) {
                        control = true
                        console.log(sublist[subKey])
                    }
                }
            }
            return control
        });
        console.log(displayClients)


        this.props.onListUpdate(displayClients)
        this.props.onClientPicked(false)

        if (displayClients.length === 0) {
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

        if (contentUpdated.length > 0) {
            clientsArray = contentUpdated;
            listItems = clientsArray.map((client, b) =>
                <SingleContact key={b} posno={b} firstName={client.general.firstName} job={client.job.title} lastName={client.general.lastName}
                               avatar={client.general.avatar}/>
            )
        } else if (clientsArray.length > 0 && this.state.noMatch === false) {
            listItems = clientsArray.map((client, b) =>
                <SingleContact key={b} posno={b} firstName={client.general.firstName} job={client.job.title} lastName={client.general.lastName}
                               avatar={client.general.avatar}/>
            )
        }
        return (
            <div className='sidebar'>
                <div className='sideBar-search-block'>
                    <Input className='sideBar-search-input' type="text"
                           onChange={this.handleSearch.bind(this)}/>
                    <Icon disabled name='search'/>
                </div>
                <List className="sidebar-client-list" selection verticalAlign='middle'>
                    {listItems}
                </List>
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