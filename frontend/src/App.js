import React, {Component} from 'react';
import './App.css';

import PlayButton from "./component/PlayButton";
import Selector_QuestionType from "./component/Selector_QuestionType";
import Selector_Category from "./component/Selector_Category";
import Selector_Difficulty from "./component/Selector_Difficulty";

import TextField from "@material-ui/core/TextField";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Play!",
      userName: "",
      categoryItems: [],
      category: '',
      difficulty: null,
      questionType: null
    }
  }

  handleTextChange = (e) => {
  this.setState({userName: e.target.value });
  };

  handleFetchApiCategoryChange = (items) => {
    this.setState({categoryList: items});
  }

  handleCategoryChange = (event) => {
    this.setState({category: event});
  };

  handleDifficultyChange = (event) => {
    this.setState({difficulty: event});
  };

  handleQuestionTypeChange = (event) => {
    this.setState({questionType: event});
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
                       onChange={this.handleTextChange}
            />

            <Selector_Category category={this.state.category} onCategoryChange={this.handleCategoryChange}/>
            <Selector_Difficulty difficulty={this.state.difficulty} onDifficultyChange={this.handleDifficultyChange}/>
            <Selector_QuestionType questionType={this.state.questionType} onQuestionTypeChange={this.handleQuestionTypeChange}/>
            
            <PlayButton text={this.state.text}/>
          </header>
        </div>
    );
  }
}

/*
* <img src={logo} className="App-logo" alt="logo" />
* <PlayButton text={this.state.text} />
* <SelectorQuestionType questionType={this.state.questionType} onQuestionTypeChange={this.handleQuestionTypeChange}/>
*
*           <div>TEST</div>
            <div>Selected category is : {this.state.category}</div>
            <div>Selected difficulty is : {this.state.difficulty}</div>
            <div>Selected questionType is : {this.state.questionType}</div>
            <div>User name is : {this.state.userName}</div>
*
*
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