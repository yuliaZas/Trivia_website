import React, {Component} from 'react';
import './QuestionPage.css';

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
            value: "",
            error: false,
            helperText: "Choose wisely",
            index: 0,
            text: "Play!",
            userName: this.props.userName,
            flag: true,
            questionList: this.props.questions,
            question: [],
            test: ""
        }
    }

    useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1, 1, 0, 0),
        },
    }));

    handleQuestion = () => {
        this.state.questionList.map((item, i) => {
            this.setState({question: item});
        });
    };


    handleFlag = () => {
        this.setState({flag: false});
    };

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

    render() {
        return (
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