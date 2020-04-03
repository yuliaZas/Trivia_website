import React, {Component} from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


export default class Selector extends Component{

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

    handleChange = (event) => {
        /*setAge(event.target.value);*/
        this.setState({text: event.target.value });
    };

    render() {
        return(
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="category"
                onChange={this.handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        )
    }
}