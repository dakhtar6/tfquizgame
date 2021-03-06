import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Intro.css';

export default class Intro extends Component {
  handleClick(e) {
    e.target.closest('section').className = 'slide-left'; 
  }
  render() {
    const {error, isLoaded} = this.props; 
    if (error) {
      return <div>Error: {error.message} <br></br> Please refresh and try again!</div>;
    } 
    else if (!isLoaded) {
      return <div style={{margin:15}}>Loading...</div>;
    }
    else {
      return (
        <section id="intro">
          <div className="flex-column-center center-text full-screen">
            <h1>Welcome To the<br></br> Trivia Challenge!</h1>
            <h2>You will be presented with {this.props.totalNumQuestions} True or False Questions</h2> 
            <h2>Can you score 100%?</h2> 
            <button onClick={(e) => this.handleClick(e)}>BEGIN</button>
          </div>
        </section>
      ); 
    } 
  }
}

Intro.propTypes = {
  totalNumQuestions: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool.isRequired, 
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}