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
//loads itself
//loads up 3 components and passes along props
//loads up with a prop of totalQuestions

/*

INTRO
------
When you click the button, a class is added and we swipe left

QUESTION
---------
Renders the same amount of questions as the totalNumQuestions Prop

*/