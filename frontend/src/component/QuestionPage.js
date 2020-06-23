import React, {Component} from 'react';
import './QuestionPage.css';

export default class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName,
            question: props.questions.question,
            options: props.questions.answers,
            correctAnswer: "",
            questionAmount: 5,
            currentQuestion: 1,
            myAnswer: "",
            clientAnswerChecked: "",
            score: 0,
            disabled: true,
            isEnd: false,
            showName: true
        }
    }

    nextQuestionHandler = () => {
        fetch(`/next_question`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        question: result.question,
                        options: result.answers,
                        correctAnswer: "",
                        disabled: true,
                        myAnswer:"",
                        showName: false
                    })
                }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
        this.scoreUpdate();
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
    };


    checkAnswer = answer => {
        //this.setState({ myAnswer: answer, disabled: false });
        fetch(`/correct_answer_checker?answer=${answer}`)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        clientAnswerChecked: result,
                        myAnswer: answer,
                        disabled: false
                    })
                }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
    };

    finishHandler = () => {
        this.scoreUpdate();
        if (this.state.currentQuestion === this.state.questionAmount) {
            this.setState({
                isEnd: true
            });
        }
    };

    playAgainHandler = () => {
        this.props.onPlayAgain()
    }

    scoreUpdate = () => {
        if (this.state.clientAnswerChecked === 'correct') {
            this.setState({
                score: this.state.score + 1
            });
        }
    }

    render() {
        const { options, myAnswer, currentQuestion,questionAmount, isEnd, showName} = this.state;

        if (isEnd) {
            return (
                <div className="result">
                    <h3>Game Over {this.state.userName}</h3>
                    <h3>Your final score is {this.state.score} points </h3>
                    <p>
                        <button className="ui inverted button" onClick={this.playAgainHandler}>
                            Play again!
                        </button>
                    </p>
                </div>
            );
        } else {
            return (
                <div className="App">
                    {/* //adding the user name only on the first question */}
                    {showName && (
                        <h1>Good luck {this.state.userName}! </h1>
                    )}
                    {/*<h1>Good luck {this.state.userName}! </h1>*/}
                    <h1>{this.state.question} </h1>
                    <span>{`Questions ${currentQuestion}  out of ${questionAmount} 
                    remaining `}</span>
                    {options.map((option,i) => (
                        <p
                            key={i}
                            className={`ui floating message options
                            ${myAnswer === option ? "selected" : null}
                            `}
                            onClick={() => this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                    ))}
                    {currentQuestion < questionAmount && (
                        <button
                            className="ui inverted button"
                            disabled={this.state.disabled}
                            onClick={this.nextQuestionHandler}
                        >
                            Next
                        </button>
                    )}
                    {/* //adding a finish button */}
                    {currentQuestion === questionAmount && (
                        <button className="ui inverted button" onClick={this.finishHandler}>
                            Finish
                        </button>
                    )}
                </div>
            );
        };
    };

}
