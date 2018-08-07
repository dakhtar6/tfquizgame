import React, { Component } from 'react';
import './Questions.css';

export default class Questions extends Component {
  handleClick(e) {
    if(e.target.tagName.toLowerCase() !== "button") {
      return; 
    }
    else {
      let button = e.target; 
      let buttonText = button.textContent.toLowerCase();
      let li = e.target.closest('li'); 

      this.props.stashUserAnswer(li, buttonText); 

      li.classList.add('selected'); 
      setTimeout(() => {
        li.classList.add('slide-left'); 
      }, 500)
      if(parseInt(li.dataset.order, 10) === this.props.totalQuestions - 1) {
        //a temporary hack to allow a cleaner layering and display of the results component
        document.getElementById('results').classList.remove('hide');
        setTimeout(this.props.gradeAnswers.bind(this), 250);
        document.getElementById('results').scrollTop = 0; 
      }
    }
  }

  fetchQuestionData() {
    fetch(`https://opentdb.com/api.php?amount=${this.props.totalQuestions}&difficulty=hard&type=boolean`)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.stashQuestionData(result); 
        },
        (error) => {
          this.props.stashQuestionData(false, error); 
        }
      )
  }

  componentDidMount() {
    this.fetchQuestionData(); 
  }

  componentWillReceiveProps(props) {
    if(props.playAgain === true) {
      this.fetchQuestionData(); 
      this.props.resetGame(); 
    }
  }

  render() {
    const questions  = this.props.questions;
    const {error, isLoaded} = this.props; 
    if (error) {
      return <div>Error: {error.message} <br></br> Please refresh and try again!</div>;
    } 
    else if (!isLoaded) {
      return <div style={{margin:15}}>Loading...</div>;
    } 
    else {
      return (
        <section id="questions">
          <ul onClick={(e) => this.handleClick(e)}>
            {questions.map((question, index, array) => (
              <li data-order={index} key={question.id} style={{zIndex: array.length - index}}>
                <div className="flex-column-center center-text full-screen">
                  <h1 className="category">{question.category}</h1>
                  <h2 className="question">{question.question}</h2>
                  <h2 className="count">{index + 1} of {this.props.totalQuestions}</h2>   
                  <div className="button-container flex-row-center">
                    <button className="true">TRUE</button>
                    <button className="false">FALSE</button>
                  </div>
                </div>
              </li>
            ))}
          </ul> 
        </section>
      ); 
    }
  }
}