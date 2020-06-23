import React, {Component} from 'react';
import './WelcomePage.css';

import Selector_QuestionType from "./Selector_QuestionType";
import Selector_Category from "./Selector_Category";
import Selector_Difficulty from "./Selector_Difficulty";

import Button from '@material-ui/core/Button';
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
        this.props.onUserName(this.state.userName);
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

    render() {
        const myStyle = {
            backgroundColor:"#cbe8f7",
            fontFamily: "fantasy"
        };
        return (
            <div className="home-page">
                <header className="home-header">

                    <img className="home-img" src='./logo2.png' alt="logo-trivia"/>
                    <p style={{color: 'black'}}>
                        Welcome to my TRIVIA game!
                    </p>
                    <TextField className="home-text" id="standard-basic" label="ENTER YOUR NAME"
                               onChange={this.handleTextChange}
                    />

                    <Selector_Category className="home-selector" style={{fontFamily: 'cursive'}}
                                       category={this.state.category} onCategoryChange={this.handleCategoryChange}/>
                    <Selector_Difficulty className="home-selector" difficulty={this.state.difficulty}
                                         onDifficultyChange={this.handleDifficultyChange}/>

                    <Selector_QuestionType className="home-selector" questionType={this.state.questionType}
                                           onQuestionTypeChange={this.handleQuestionTypeChange}/>
                    <Button style={myStyle} onClick= { () => this.props.onQuestionFetch(this.state.category,
                        this.state.difficulty, this.state.questionType, this.state.userName)}>
                        {this.state.text}
                    </Button>

                </header>
            </div>
        );
    }
}
