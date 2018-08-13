import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Quiz from './Quiz';

configure({ adapter: new Adapter() });

describe('Quiz Component', () => {
  describe('when it loads into the DOM', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      const quiz = ReactDOM.render(<Quiz totalNumQuestions={10} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  }); 
}); 