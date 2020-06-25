import React, { Component } from "react";

export default class Selector_QuestionTypeNoneBoolean extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ""
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e) {
        this.props.onQuestionTypeChange(e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <select id="dropdown"  onChange={this.handleDropdownChange}>
                            <option value="N/A">Question Type</option>
                            <option value="multiple">Multiple</option>
                            {/*<option value="boolean">True / False</option>*/}
                        </select>
                    </div>


                </div>
            </div>
        );
    }
}
///<div>Selected value is : {this.state.selectValue}</div>
///this.setState({ selectValue: e.target.value });
///value={this.state.selectValue}