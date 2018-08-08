import React, { Component } from 'react';
import './Questions.css';

function Question(props) {
  return (
    <li data-order={props.index} style={{zIndex: props.array.length - props.index}}>
      <div className="flex-column-center center-text full-screen">
        <h1 className="category">{props.question.category}</h1>
        <h2 className="question">{props.question.question}</h2>
        <h2 className="count">{props.index + 1} of {props.totalNumQuestions}</h2>   
        <div className="button-container flex-row-center">
          <button className="true">TRUE</button>
          <button className="false">FALSE</button>
        </div>
      </div>
    </li>
  );
}

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
      if(parseInt(li.dataset.order, 10) === this.props.totalNumQuestions - 1) {
        this.props.gradeAnswers(); 
        //Allow a cleaner layering and display of the results component
        document.getElementById('results').classList.remove('hide');
        document.getElementById('results').scrollTop = 0; 
      }
    }
  }

  fetchQuestionData() {
    fetch(`https://opentdb.com/api.php?amount=${this.props.totalNumQuestions}&difficulty=hard&type=boolean`)
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
    return (
      <section id="questions">
        <ul onClick={(e) => this.handleClick(e)}>
          {questions.map((question, index, array) => (
            <Question question={question} key={question.id} index={index} array={array} totalNumQuestions={this.props.totalNumQuestions} /> 
          ))}
        </ul> 
      </section>
    ); 
  }
}