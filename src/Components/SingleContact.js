import React, {Component} from 'react';
import {connect} from "react-redux";

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

        while (target != this) {
            if (target.tagName == 'LI') {
                console.log(
                    target.getAttribute("data-pos"))
                this.setState(
                    {elementClickedIndex: target.getAttribute("data-pos")},
                    function () {
                        // this.props.showDetails(this.state.elementClickedIndex)
                        console.log(this.state.elementClickedIndex)
                        this.props.onClientPicked(target.getAttribute("data-pos"))
                        console.log(this.props.clientPicked)
                    })
                return;
            }
            target = target.parentNode;
        }
        console.log(this.state.elementClickedIndex)
    }

    render() {
        return (
            <li className='sidebar-list-item' data-pos={this.props.posno} key={this.props.key}
                onClick={this.showDetails.bind(this)}>
                <img className='sidebar-client-image' src={this.props.avatar} alt=""/>
                <div className="sidebar-name-block">
                    <p>{this.props.firstName}</p>
                    <p>{this.props.lastName}</p>
                </div>
            </li>
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