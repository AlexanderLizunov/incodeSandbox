import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import Details from './Components/Details'
import Sidebar from './Components/Sidebar'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: '',
            picked: ' No Match'
        }
    }

    componentWillMount() {
        this.getText()
    }

    getText() {
        axios.get('clients.json')
            .then((response) => {
                this.props.onListDownload(response.data)
                // console.log(this.props.clientList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        
        return (
            <div>
                <h1>Incode Sandbox Task</h1>
                <div className="content-container">
                    <Sidebar value={this.state.clients}/>
                    <Details value={this.state.picked}/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        clientList: state.clientList,
        clientSearch: state.clientSearch
    }),
    dispatch => ({
        onListDownload: (array) => {
            dispatch({type: 'LIST_DOWNLOAD', payload: array})
        },
    })
)(App);
