import React, {Component} from 'react';
import './App.css';
import BlueButton from "./component/BlueButton";
import SelectorCategory from "./component/SelectorCategory";
import SelectorQuestionType from "./component/SelectorQuestionType";
import SelectorDifficulty from "./component/SelectorDifficulty";
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

            <img className="App-img" src='./trivia.png' alt="logo-trivia"/>
            <p style={{color: 'black'}}>
              Welcome to my TRIVIA web site!
            </p>
            <TextField id="standard-basic" label="ENTER YOUR NAME"
                       onChange={this.handleChange}
            />
            <SelectorCategory />
            <SelectorQuestionType/>
            <SelectorDifficulty/>
            <BlueButton text="PLAY!"/>
          </header>
        </div>
    );
  }
}

/*
* <img src={logo} className="App-logo" alt="logo" />
* <BlueButton text={this.state.text} />
* the link: (can be used during questions)
*  <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
* */