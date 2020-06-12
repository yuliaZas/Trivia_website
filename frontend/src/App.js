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
      userName: ""
    }
  }

  handlePageChange = (newPage) => {
    this.setState({currentPage: newPage});
  }

  handleQuestionFetch = (questionArr) => {
    this.setState({questions: questionArr})
  }

  handleUserName = (userName) => {
    this.setState({userName: userName})
  }

  render() {
    if (this.state.questions.length < 1) return <WelcomePage onQuestionFetch={this.handleQuestionFetch} onUserName={this.handleUserName}/>
    else return <QuestionPage questions={this.state.questions} userName={this.state.userName}/>
  }
}
