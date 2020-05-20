import React, {Component} from 'react';


export default class FetchApiCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        const url = "https://opentdb.com/api_category.php";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({isLoaded: true, items: data.trivia_categories});
    }

    handleChange = () => {
        this.props.onFetch(this.state.items);
    }

    render() {

        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            const optionItems = this.state.items.map((item) =>
                <option key={item.name}>{item.name}</option>
            );
            return (
                <div>onChange={this.handleChange}</div>
            );
        }
    }
}