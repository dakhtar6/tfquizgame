import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; 
import Intro from '../intro/Intro';
import Questions from '../questions/Questions';
import Results from '../results/Results';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false, 
      error: null, 
      questions: [], 
      chosenAnswers: [],
      correctlySelectedAnswers: []
    }
  };

  fetchQuestionData() {
    axios.get(`https://opentdb.com/api.php?amount=${this.props.totalNumQuestions}&difficulty=hard&type=boolean`, {cancelToken: source.token})
      .then(res => {
        this.stashQuestionData(res.data.results)
      }) 
      .catch(error => {
        this.stashQuestionData(false, error)
      })
  }

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
      let questions = result
      questions.map((question, index, array) => {
        question.question = this.decodeHtml(question.question);
        question.id = `${question.question}_${Math.random()}`;
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

  componentDidMount() {
    this.fetchQuestionData();
  }

  componentWillUnmount() {
    source.cancel('Operation canceled');
  }

  render() {
    return (   
      <main id="quiz">
        <Intro 
          totalNumQuestions={this.props.totalNumQuestions}
          isLoaded={this.state.isLoaded} 
          error={this.state.error} /> 
        <Questions
          totalNumQuestions={this.props.totalNumQuestions}
          questions={this.state.questions} 
          stashUserAnswer={(target, targetText) => this.stashUserAnswer(target, targetText)}
          gradeAnswers={() => this.gradeAnswers()} />
        <Results
          totalNumQuestions={this.props.totalNumQuestions}
          questions={this.state.questions} 
          correctlySelectedAnswers={this.state.correctlySelectedAnswers}
          fetchQuestionData={() => this.fetchQuestionData()} />
      </main> 
    ); 
  }   
}

Quiz.propTypes = {
  totalNumQuestions: PropTypes.number.isRequired
}