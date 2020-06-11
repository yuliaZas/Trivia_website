import React, {Component} from 'react';

import './QuestionPage.css';




export default class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            text: "Play!",
            userName: "",
            flag: true,
            questionList: this.props.questions,
            question: []

        }
    }

    handleQuestion = () => {
        this.state.questionList.map((item, i) => {
            this.setState({question: item});
        });
    };


    handleFlag = () => {
        this.setState({flag: false})
    };

    render() {
        return (
            <div className="page">
                <header className="header">

                    <div className="DottedBox" onBeforeInput={this.handleQuestion}>
                        <p className="DottedBox_content">Hello {this.state.userName}</p>
                    </div>
                    <div>
                        {
                            this.state.questionList.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div>
                                                <a>Question: {item.question}</a>
                                            <div>
                                                <div>
                                                    <a>Correct Answer: {item.correct_answer}</a>
                                                </div>
                                                <a>Incorrect Answers:</a>
                                                {item.incorrect_answers.map(s => (<li>{s}</li>))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </header>
            </div>
        );
    }
}


/*
<ul>
                        {this.state.questionList.map(s => (<li>{s.question}</li>))}
                    </ul>
style={{color: 'pink', background: 'gray'}}
<Selector onDifficultyChange={this.handleDifficultyChange}/>


* <img src={logo} className="App-logo" alt="logo" />
*<Button text={this.state.text} onClick={this.handleClick}/>
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