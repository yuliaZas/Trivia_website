import React, {Component} from 'react';
import './App.css';
import WelcomePage from "./component/WelcomePage";
import QuestionPage from "./component/QuestionPage";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "welcomePage"
    }
  }

  handlePageChange = (newPage) => {
    this.setState({currentPage: newPage});
  }

  render() {
    if (this.state.currentPage === "welcomePage") return <WelcomePage onPageChange={this.handlePageChange}/>
    else if(this.state.currentPage === "questionPage") return <QuestionPage onPageChange={this.handlePageChange}/>
  }
}
