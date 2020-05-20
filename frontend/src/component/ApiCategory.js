import React, {Component} from 'react';


export default class ApiCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.trivia_categories
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {

        if (this.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {this.state.items.map(item => (
                        <li key={item.name}>
                            name:{item.name} id:{item.id}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}