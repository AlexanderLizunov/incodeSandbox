import React, {Component} from 'react';
import {connect} from "react-redux";
import {List, Image} from 'semantic-ui-react'

class SingleContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            elementClickedIndex: '',
        }
    }

    showDetails(event) {
        console.log(event.target.tagName)

        let target = event.target;

        while (target !== this) {
            if (target.getAttribute("data-list-item") == 'listitem') {
                // console.log(
                //     target.getAttribute("data-pos"))
                this.setState(
                    {elementClickedIndex: target.getAttribute("data-pos")},
                    function () {
                        // this.props.showDetails(this.state.elementClickedIndex)
                        // console.log(this.state.elementClickedIndex)
                        this.props.onClientPicked(target.getAttribute("data-pos"))
                        // console.log(this.props.clientPicked)
                    })
                return;
            }
            target = target.parentNode;
        }
        console.log(this.state.elementClickedIndex)
    }

    render() {
        return (
                <List.Item className='sidebar-list-item' data-list-item='listitem' data-pos={this.props.posno} key={this.props.key} onClick={this.showDetails.bind(this)}>
                    <Image avatar src={this.props.avatar} />
                    <List.Content>
                        <List.Header>{this.props.firstName} {this.props.lastName}</List.Header>
                        <List.Header>{this.props.job} </List.Header>
                    </List.Content>
                </List.Item>

        );
    }
}

export default connect(
    state => ({
        clientPicked: state.clientPicked
    }),
    dispatch => ({
        onClientPicked: (array) => {
            dispatch({type: 'CLIENT_PICKED', payload: array})
        }
    })
)(SingleContact);