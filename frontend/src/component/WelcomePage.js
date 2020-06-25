import React, {Component} from 'react';
import './WelcomePage.css';

import Selector_QuestionType from "./Selector_QuestionType";
import Selector_Category from "./Selector_Category";
import Selector_Difficulty from "./Selector_Difficulty";
import Selector_QuestionTypeNoneBoolean from "./Selctor_QustionTypeNoneBoolean";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class welcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Play!",
            userName: "",
            category: "",
            difficulty: null,
            questionType: null,
            isLoading: false,
            noneBoolean: false,
            noneBooleanInCategory: false,
            noBooleanAtAll: [13, 20, 25, 26, 29],
            noBooleanEasy: [28, 32],
            noBooleanMedium: [16],
            noBooleanHard: [16, 19, 24, 27, 28, 32]
        }
    }

    handleTextChange = (e) => {
        this.setState({userName: e.target.value });
        this.props.onUserName(this.state.userName);
    };

    handleCategoryChange = (event) => {
        this.setState({category: event});
        let category = parseInt(event)
        if (this.state.noBooleanAtAll.includes(category)){
            this.setState({noneBoolean: true});
        }
        else {
            this.setState({noneBoolean: false});
        }
    };

    handleDifficultyChange = (event) => {
        this.setState({difficulty: event});
        if (event === "easy") {
            this.booleanSetState(this.state.noBooleanEasy.includes(parseInt(this.state.category)));
        }
        else if (event === "medium") {
            this.booleanSetState(this.state.noBooleanMedium.includes(parseInt(this.state.category)));
        }
        else if (event === "hard") {
            this.booleanSetState(this.state.noBooleanHard.includes(parseInt(this.state.category)));
        }
    };

    booleanSetState = (value) => {
        if (value){
            this.setState({noneBooleanInCategory: true});
        }
        else {
            this.setState({noneBooleanInCategory: false});
        }
    }

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
                    <TextField className="home-text" id="outlined-basic" variant="outlined" label="ENTER YOUR NAME"
                               onChange={this.handleTextChange}
                    />

                    <Selector_Category className="home-selector" style={{fontFamily: 'cursive'}}
                                       category={this.state.category} onCategoryChange={this.handleCategoryChange}/>
                    <Selector_Difficulty className="home-selector" difficulty={this.state.difficulty}
                                         onDifficultyChange={this.handleDifficultyChange}/>

                    {(!(this.state.noneBoolean) && !(this.state.noneBooleanInCategory)) && (
                        <Selector_QuestionType className="home-selector" questionType={this.state.questionType}
                                               onQuestionTypeChange={this.handleQuestionTypeChange}/>
                    )}

                    {(this.state.noneBoolean || this.state.noneBooleanInCategory) && (
                        <Selector_QuestionTypeNoneBoolean className="home-selector" questionType={this.state.questionType}
                                               onQuestionTypeChange={this.handleQuestionTypeChange}/>
                    )}
                    <Button style={myStyle} onClick= { () => this.props.onQuestionFetch(this.state.category,
                        this.state.difficulty, this.state.questionType, this.state.userName)}>
                        {this.state.text}
                    </Button>

                </header>
            </div>
        );
    }
}
