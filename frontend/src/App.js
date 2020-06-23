import React, {Component} from 'react';
import './App.css';
import WelcomePage from "./component/WelcomePage";
import QuestionPage from "./component/QuestionPage";


export default class App extends Component {
  constructor(props) {
    super(props);
    const index = 0;

    this.state = {
      currentPage: "welcomePage",
      questions: [],
      userName: "",
      playFlag: true
    }
  }

  handlePlayAgain = () => {
    this.setState({playFlag: true});
  }

  handleUserName = (userName) => {
    this.setState({userName: userName})
  }

  handleFetch = (category, difficulty, questionType, userName) => {
    this.setState({userName: userName});
    fetch(`/question_generator?category=${category}`+
        `&difficulty=${difficulty}&type=${questionType}`)
        .then(res => res.json())
        .then(
            (result) => {
              // result.response_code : check the response status
              this.setState({
                questions: result,
                playFlag: false
              })
            }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
  };

  render() {
    if (this.state.playFlag){
      return(
          <body>
            <WelcomePage onQuestionFetch={this.handleFetch} onUserName={this.handleUserName}/>
          </body>
      );
    }
    else {
      return (
          <body>
            <QuestionPage questions={this.state.questions} userName={this.state.userName} onPlayAgain={this.handlePlayAgain}/>
          </body>
      );
    }
  };
};
