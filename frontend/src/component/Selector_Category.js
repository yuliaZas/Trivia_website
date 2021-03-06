import React, { Component } from "react";
import option from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default class Selector_Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: ""
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e) {
        this.props.onCategoryChange(e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <select id="dropdown"  onChange={this.handleDropdownChange}>
                            <option value="N/A">Category</option>
                            <option value={9}>General Knowledge</option>
                            <option value={10}>Entertainment: Books</option>
                            <option value={11}>Entertainment: Film</option>
                            <option value={12}>Entertainment: Music</option>
                            <option value={13}>Entertainment: Musicals & Theatres</option>
                            <option value={14}>Entertainment: Television</option>
                            <option value={15}>Entertainment: Video Games</option>
                            <option value={16}>Entertainment: Board Games</option>
                            <option value={17}>Science & Nature</option>
                            <option value={18}>Science: Computers</option>
                            <option value={19}>Science: Mathematics</option>
                            <option value={20}>Mythology</option>
                            <option value={21}>Sports</option>
                            <option value={22}>Geography</option>
                            <option value={23}>History</option>
                            <option value={24}>Politics</option>
                            <option value={25}>Art</option>
                            <option value={26}>Celebrities</option>
                            <option value={27}>Animals</option>
                            <option value={28}>Vehicles</option>
                            <option value={29}>Entertainment: Comics</option>
                            {/*<option value={30}>Science: Gadgets</option> - less then 5 questions*/}
                            <option value={31}>Entertainment: Japanese Anime & Manga</option>
                            <option value={32}>Entertainment: Cartoon & Animations</option>
                        </select>
                    </div>


                </div>
            </div>
        );
    }
}