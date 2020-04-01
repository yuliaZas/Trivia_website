import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import BlueButton from "./component/BlueButton";
import TextField from "@material-ui/core/TextField";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "I'm text"
    }
  }

  handleChange = (e) => {
  this.setState({text: e.target.value });
  };


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to my Trivia web site.
            </p>
            <BlueButton text={this.state.text} />
            <TextField id="standard-basic" label="Standard"
                       onChange={this.handleChange}
            />
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

