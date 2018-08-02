import React, { Component } from 'react';
import './Intro.css';

export default class Intro extends Component {
  handleClick(e) {
    e.target.closest('section').classList.add('slide-left'); 
  }
  render() {
    return (
      <section id="intro">
        <div className="flex-column-center center-text full-screen">
          <h1>Welcome To the<br></br> Trivia Challenge!</h1>
          <h2>You will be presented with {this.props.totalQuestions} True or False Questions</h2> 
          <h2>Can you score 100%?</h2> 
          <button onClick={(e) => this.handleClick(e)}>BEGIN</button>
        </div>
      </section>
    ); 
  }
}