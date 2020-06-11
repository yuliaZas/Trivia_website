import React, {Component} from 'react';
import './App.css';
import WelcomePage from "./component/WelcomePage";
import QuestionPage from "./component/QuestionPage";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "welcomePage",
      questions: []
    }
  }

  handlePageChange = (newPage) => {
    this.setState({currentPage: newPage});
  }

  handleQuestionFEtch = (questionArr) => {
    this.setState({questions: questionArr})
  }

  render() {
    if (this.state.questions.length < 1) return <WelcomePage onQuestionFetch={this.handleQuestionFEtch}/>
    else return <QuestionPage questions={this.state.questions}/>
  }
}
