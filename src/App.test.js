import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from '.quiz/Quiz';
import Intro from './intro/Intro';
import Questions from './questions/Questions';
import Results from './results/Results';

it('renders itself without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders 3 components without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//QUIZ
//loads up 3 components and passes along props