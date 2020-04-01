import React, {Component} from 'react';
import { Button } from '@material-ui/core';


export default class BlueButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            color: "white"
        }
    }

    handleClick = () => {
        if (this.state.color === "white"){
            this.setState({color: "pink"})
        }
        else {
            this.setState({color: "white"})
        }

    };

    render() {
        return(
            <Button
                style={{backgroundColor: this.state.color}}
                onClick={this.handleClick}
            >
                {this.props.text}
            </Button>
            )
    }
}