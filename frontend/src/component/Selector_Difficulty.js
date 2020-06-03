import React, { Component } from "react";
import option from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default class Selector_Difficulty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ""
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e) {
        this.props.onDifficultyChange(e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <select id="dropdown"  onChange={this.handleDropdownChange}>
                            <option value="N/A">Difficulty</option>
                            <option value={"easy"}>Easy</option>
                            <option value={"medium"}>Medium</option>
                            <option value={"hard"}>Hard</option>
                        </select>
                    </div>


                </div>
            </div>
        );
    }
}
