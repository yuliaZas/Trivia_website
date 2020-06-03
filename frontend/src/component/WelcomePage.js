import React, {Component} from 'react';
import './WelcomePage.css';

import PlayButton from "./PlayButton";
import Selector_QuestionType from "./Selector_QuestionType";
import Selector_Category from "./Selector_Category";
import Selector_Difficulty from "./Selector_Difficulty";
import Button from "./Button";
import TextField from '@material-ui/core/TextField';

export default class welcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Play!",
            userName: "",
            categoryItems: [],
            category: '',
            difficulty: null,
            questionType: null,
            isLoading: false,
            questionList: []
        }
    }

    handleTextChange = (e) => {
        this.setState({userName: e.target.value });
    };

    handleFetchApiCategoryChange = (items) => {
        this.setState({categoryList: items});
    };

    handleCategoryChange = (event) => {
        this.setState({category: event});
    };

    handleDifficultyChange = (event) => {
        this.setState({difficulty: event});
    };

    handleQuestionTypeChange = (event) => {
        this.setState({questionType: event});
    };

    handleClick = () => {
        this.setState({isLoading: true});
        fetch(`http://127.0.0.1:5000/question_generator?amount=1&category=${this.state.category}
        &difficulty=${this.state.difficulty}&type=${this.state.questionType}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false,
                        questionList: result.items
                    });
        });
    };

    render() {
        return (
            <div className="home-page">
                <header className="home-header">

                    <img className="home-img" src='./trivia.png' alt="logo-trivia"/>
                    <p style={{color: 'black'}}>
                        Welcome to my TRIVIA web site!
                    </p>
                    <TextField id="standard-basic" label="ENTER YOUR NAME"
                               onChange={this.handleTextChange}
                    />

                    <Selector_Category className="home-selector" style={{fontFamily: "cursive"}} category={this.state.category} onCategoryChange={this.handleCategoryChange}/>
                    <Selector_Difficulty className="home-selector" difficulty={this.state.difficulty} onDifficultyChange={this.handleDifficultyChange}/>
                    <Selector_QuestionType className="home-selector" questionType={this.state.questionType} onQuestionTypeChange={this.handleQuestionTypeChange}/>
                    <Button text={this.state.text} onClick={this.handleClick}/>
                </header>
            </div>
        );
    }
}

/*
* <img src={logo} className="App-logo" alt="logo" />
*
* <PlayButton className="home-button" text={this.state.text} onClick={this.handleClick}/>
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