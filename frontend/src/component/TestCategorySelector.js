import React from 'react';
import Select from "@material-ui/core/Select";

export default class TestCategorySelector extends React.Component {
    constructor(props) {
        super(props);

    }

    handleChange = (event) => {
        this.props.onCategoryChange(event.target.value);
    };

    render () {
        const items = this.props.categoryItems;
        const optionItems = items.map((item) =>
            <option key={item.name}>{item.name}</option>
        );

        return (
            <div>
                <select
                    value={this.props.category}
                    onChange={this.handleChange}
                >
                    {optionItems}
                </select>
            </div>
        )
    }
}
