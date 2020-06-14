import React, {Component} from 'react';
import './QuestionPage.css';
//import { Data } from "./Data";

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';




export default class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName,
            data: props.questions,
            question: props.questions.question,
            options: props.questions.answers,
            correctAnswer: "",
            questionAmount: 5,
            currentQuestion: 1,
            myAnswer: null,
            clientAnswerChecked: '',
            score: 0,
            disabled: true,
            isEnd: false
        }
    }
/* old code
    componentDidMount() {
        //this.loadQuizData();
        this.setState({userName: this.props.userName});
        this.setState({questionList:  this.props.questions});
        console.log(this.state.questionList[this.state.currentQuestion].question);
        console.log(this.state.userName);
        this.setState({question: this.state.questionList[this.state.currentQuestion].question});
        this.setState({options: this.state.questionList[this.state.currentQuestion].incorrect_answers});
        this.setState({options: [...this.state.options, this.state.questionList[this.state.currentQuestion].correct_answer]});
        console.log(this.state.options);
        this.setState({correctAnswer: this.state.questionList[this.state.currentQuestion].correct_answer});
    };
    
    loadQuizData = () => {
        this.setState({userName: this.props.userName});
        this.setState({questionList:  this.props.questions});
        this.setState({question: this.state.questionList[this.state.currentQuestion].question});
        this.setState({options: this.state.questionList[this.state.currentQuestion].incorrect_answers});
        this.setState({options: [...this.state.options, this.state.questionList[this.state.currentQuestion].correct_answer]});
        console.log(this.state.options);
        this.setState({correctAnswer: this.state.questionList[this.state.currentQuestion].correct_answer});
    };

        componentDidUpdate(prevProps, prevState) {
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    questions: this.state.questionList[this.state.currentQuestion].question,
                    options: this.state.questionList[this.state.currentQuestion].options,
                    answer: this.state.questionList[this.state.currentQuestion].answer
                };
            });
        }
    }
 */
    nextQuestionHandler = () => {
        fetch(`/next_question`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result,
                        question: result.question,
                        options: result.answers
                    })
                }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });

        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
    };


    checkAnswer = answer => {
        this.setState({ myAnswer: answer, disabled: false });
        fetch(`/correct_answer_checker?answer=${this.state.myAnswer}`)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        clientAnswerChecked: result
                    })
                }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
        if (this.state.clientAnswerChecked === 'correct') {
            this.setState({
                score: this.state.score + 1
            });
        }
    };
    finishHandler = () => {
        if (this.state.currentQuestion === this.state.questionAmount) {
            this.setState({
                isEnd: true
            });
        }
    };

    playAgainHandler = () => {
        this.props.onPlayAgain()
    }


    render() {
        const { options, myAnswer, currentQuestion,questionAmount, isEnd } = this.state;

        if (isEnd) {
            return (
                <div className="result">
                    <h3>Game Over {this.state.userName}, your Final score is {this.state.score} points </h3>
                    <p>
                        <button className="ui inverted button" onClick={this.playAgainHandler}>
                            play again!
                        </button>
                    </p>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <h1>Good luck {this.state.userName}!</h1>
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


/*adding to list:
const handleSubmit = event => {
    if (value) {
      setList(list.concat(value));
    }

    setValue('');

    event.preventDefault();
  };


    useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1, 1, 0, 0),
        },
    }));

        handleRadioChange = (event) => {
        this.setState({value: event.target.value});
        this.setState({helperText: " "});
        this.setState({error: false});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.value === 'best') {
            this.setState({helperText: "You got it!"});
            this.setState({error: false});
        } else if (this.state.value === 'worst') {
            this.setState({helperText: "Sorry, wrong answer!"});
            this.setState({error: true});
        } else {
            this.setState({helperText: "Please select an option."});
            this.setState({error: false});
        }
    };
                                        <form onSubmit={this.handleSubmit}>
                                            <FormControl component="fieldset" error={this.state.error} className={this.useStyles.formControl}>
                                                <FormLabel component="legend" style={{fontWeight: 'bold'}}>{item.question}</FormLabel>
                                                <RadioGroup aria-label="quiz" name="quiz" value={this.state.value} onChange={this.handleRadioChange}>
                                                    <FormControlLabel value="best" control={<Radio />} label={item.correct_answer} />
                                                    <div>
                                                    {item.incorrect_answers.map(function (answer, i) {
                                                        return <div key={i}>
                                                            <FormControlLabel value="worst" control={<Radio />} label={answer} />
                                                        </div>
                                                    })}
                                                    </div>
                                                </RadioGroup>
                                                <FormHelperText>{this.helperText}</FormHelperText>
                                                <Button type="submit" variant="outlined" color="primary" className={this.useStyles.button}>
                                                    Check Answer
                                                </Button>
                                            </FormControl>
                                        </form>



<ul>
                        {this.state.questionList.map(s => (<li>{s.question}</li>))}
                    </ul>
style={{color: 'pink', background: 'gray'}}
<Selector onDifficultyChange={this.handleDifficultyChange}/>


render:
<div className="page">
                <header className="header">

                    <div className="DottedBox" onBeforeInput={this.handleQuestion}>
                        <p className="DottedBox_content">
                            Hello {this.state.userName}
                        </p>
                    </div>
                    <div>

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