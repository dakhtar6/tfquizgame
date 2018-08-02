import React, { Component } from 'react';
import './Results.css';

export default class Results extends Component {
  handleClick(e) {
    this.props.resetGame(); 
  }
  render() {
    const questions = this.props.questions;
    return (
      <section id="results" className="hide">
        <div className="flex-column-center full-screen">
          <h2 className="score center-text">You Scored <br></br> {this.props.correctlySelectedAnswers.length} of {this.props.totalQuestions}</h2>
          <ul>
            {questions.map((question, index) => (
              <li data-order={index} key={question.id}>
                <div>
                  <div className="answer-indicator-icon minus">-</div>
                  <h2 className="question">{question.question}</h2>
                </div>
              </li>
            ))}
          </ul> 
          <button className="play-again" onClick={(e) => this.handleClick(e)}>PLAY AGAIN?</button>
        </div>
      </section>
    )
  }
}
