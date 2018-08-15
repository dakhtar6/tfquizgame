import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Results.css';

function Result(props) {
  return(
    <li data-order={props.index} key={props.question.id}>
      <div>
        <div className="answer-indicator-icon minus">-</div>
        <h2 className="question">{props.question.question}</h2>
      </div>
    </li>
  );
}

export default class Results extends Component {
  handleClick(e) {
    this.props.fetchQuestionData(); 
  }
  render() {
    const {questions} = this.props;
    return (
      <section id="results" className="hide">
        <div className="flex-column-center full-screen">
          <h2 className="score center-text">You Scored <br></br> {this.props.correctlySelectedAnswers.length} of {this.props.totalNumQuestions}</h2>
          <ul>
            {questions.map((question, index) => (
              <Result question={question} index={index} key={question.id} />
            ))}
          </ul> 
          <button className="play-again" onClick={(e) => this.handleClick(e)}>PLAY AGAIN?</button>
        </div>
      </section>
    )
  }
}

Results.propTypes = {
  totalNumQuestions: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  correctlySelectedAnswers: PropTypes.array.isRequired, 
}