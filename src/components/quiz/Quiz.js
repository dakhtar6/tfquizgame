import React, { Component } from 'react';
import Intro from '../intro/Intro';
import Questions from '../questions/Questions';
import Results from '../results/Results';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [], 
      chosenAnswers: [],
      isLoaded: false, 
      error: null, 
      playAgain: false, 
      correctlySelectedAnswers: []
    }
  };

  stashUserAnswer(li, buttonText) {
    //create a copy of the chosenAnswers array to ensure data immutability
    let chosenAnswers = this.state.chosenAnswers.slice();
    chosenAnswers[li.dataset.order] = buttonText;
    this.setState({chosenAnswers: chosenAnswers});
  }

  decodeHtml(html) {
    //parse html entities returned in JSON data 
    let textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  }

  stashQuestionData(result, error) {
    if(result) {
      let questions = result.results; 
      questions.map((question, index, array) => {
        question.question = this.decodeHtml(question.question);
        question.id = `${question.question}_${Math.random()}`
        return question; 
      })
      this.setState({
        isLoaded: true,
        questions: questions
      });
    }
    else {
      this.setState({
        isLoaded: true,
        error: error
      });
    }
  }

  resetGame() {
    this.setState({playAgain: !this.state.playAgain});
    document.getElementById('results').classList.add('hide'); 
  }

  renderAnswerIcons() {
    const icons = [].slice.apply(document.querySelectorAll('.answer-indicator-icon')); 
    const correctlySelectedAnswers = this.state.correctlySelectedAnswers; 
    correctlySelectedAnswers.forEach((answer) => {
      icons[answer].innerText = "+"; 
      icons[answer].classList.add('plus'); 
      icons[answer].classList.remove('minus'); 
    }); 
  }

  gradeAnswers() {
    const chosenAnswers = this.state.chosenAnswers; 
    const correctAnswers = this.state.questions.map((question) => {
      return question.correct_answer.toLowerCase(); 
    }); 
    const correctlySelectedAnswers = [];  
    correctAnswers.forEach((answer, index) => {
      if(answer === chosenAnswers[index]) {
        correctlySelectedAnswers.push(index); 
      } 
    });
    this.setState({correctlySelectedAnswers: correctlySelectedAnswers}, this.renderAnswerIcons); 
  }

  render() {
    return (   
      <main id="quiz">
        <Intro 
          isLoaded={this.state.isLoaded} 
          error={this.state.error} 
          totalNumQuestions={this.props.totalNumQuestions} /> 
        <Questions
          totalNumQuestions={this.props.totalNumQuestions}
          questions={this.state.questions} 
          playAgain={this.state.playAgain} 
          resetGame={() => this.resetGame()}
          stashUserAnswer={(target, targetText) => this.stashUserAnswer(target, targetText)}
          stashQuestionData={(result) => this.stashQuestionData(result)} 
          gradeAnswers={() => this.gradeAnswers()} />
        <Results
          totalNumQuestions={this.props.totalNumQuestions}
          questions={this.state.questions} 
          playAgain={this.state.playAgain}
          correctlySelectedAnswers={this.state.correctlySelectedAnswers}
          resetGame={() => this.resetGame()} />
      </main> 
    ); 
  }   
}