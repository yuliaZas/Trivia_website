import React, {Component} from 'react';
import './App.css';
import BlueButton from "./component/BlueButton";
import SelectorCategory from "./component/SelectorCategory";
import SelectorQuestionType from "./component/SelectorQuestionType";
import SelectorDifficulty from "./component/SelectorDifficulty";
import FetchApiCategory from "./component/FetchApiCategory";
import TextField from "@material-ui/core/TextField";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "I'm text",
      categoryItems: [],
      category: ''
      // TODO: add the properties for the answer to the server
    }
  }

  handleChange = (e) => {
  this.setState({text: e.target.value });
  };

  handleFetchApiCategoryChange = (items) => {
    this.setState({categoryList: items});
  }

  handleCategoryChange = (event) => {
    this.setState({category: event.target.value});
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
            <FetchApiCategory onFetch={this.handleFetchApiCategoryChange}/>
            <ul>
              {this.state.categoryItems.map(item => (
                  <li key={item.name}>
                    name:{item.name} id:{item.id}
                  </li>
              ))}
            </ul>
            <SelectorCategory category={this.state.category} onCategoryChange={this.handleCategoryChange}/>
            <SelectorQuestionType/>
            <SelectorDifficulty/>
            <BlueButton text={this.state.text}/>
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