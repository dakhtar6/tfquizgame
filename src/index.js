import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Quiz from './components/quiz/Quiz.js'; 

ReactDOM.render(<Quiz totalNumQuestions={10}/>, document.getElementById('root'));