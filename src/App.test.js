import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Quiz from './quiz/Quiz';
import Intro from './intro/Intro';
import Questions from './questions/Questions';
import Results from './results/Results';

configure({ adapter: new Adapter() });

describe('Quiz Component', () => {
  describe('when it loads into the DOM', () => {
    it('renders 3 child components without crashing', () => {
      // const div = document.createElement('div');
      // const quiz = ReactDOM.render(<Quiz totalNumQuestions={10} />, div);
      // ReactDOM.unmountComponentAtNode(div);
      // console.log("DJDJ", quiz.length); 
      // expect(quiz.children().length).toBe(3);
      const wrapper = mount(
        <Quiz totalNumQuestions={10} />
      );  
      // expect(wrapper.children().length).toBe(3); 
      wrapper.unmount();
      console.log("WRAP", wrapper.children()); 
      expect(wrapper.children().length).toBe(3); 

    });
  }); 
}); 

describe('Intro Component', () => {
  describe('when there is an error in fetching the question data', () => {
    it('should render an error message', () => {
      const wrapper = mount(
        <Intro isLoaded={true} error={{message: "404 Not Found"}} />
      );
      expect(wrapper.html()).toBe('<div>Error: 404 Not Found <br> Please refresh and try again!</div>');
      wrapper.unmount();
    });
  });

  describe('when it is fetching the question data', () => {
    it('should render a loading message', () => {
      const wrapper = mount(
        <Intro isLoaded={false} />
      );
      expect(wrapper.text()).toBe('Loading...');
      wrapper.unmount();
    });
  });

  describe('when it is done fetching the question data', () => {
    it('should render a h2 element that populates with the value of the totalNumQuestions prop', () => {
      const wrapper = mount(
        <Intro isLoaded={true} totalNumQuestions={10} />
      );
      expect(wrapper.containsMatchingElement(<h2>You will be presented with 10 True or False Questions</h2>)).toBe(true);
      wrapper.unmount();
    });
  });
  //issues - Can simulate the event listener but can't find the actual section#intro DOM element to do a comparison with. 
  describe('when you click on the begin button', () => {
    it('adds a class of slide-left to the section', () => {
      const wrapper = mount(
        <Intro isLoaded={true} totalNumQuestions={10} />
      );
      const clickEvent = {target: {closest: () => wrapper.find('button').closest('section')}}; 
      wrapper.find('button').simulate('click', clickEvent);
      // console.log(wrapper.find('section').debug()); 
      // console.log(document.querySelector('#intro').text); 
      expect(wrapper.find('section').hasClass('slide-left')).toBe(true);
      wrapper.unmount();
    });
  });
});

//QUIZ
//loads itself
//loads up 3 components and passes along props
//loads up with a prop of totalQuestions

/*

INTRO
------
When an error is present we render an error message
When isLoaded is false we render a loading message
If an error is not present, and when isLoaded is true we render an intro
The intro count is the value of props.totalNumQuestions
When you click the button, a class is added and we swipe left

QUESTION
---------
Renders the same amount of questions as the totalNumQuestions Prop
what are all the functions being called with? Are they being called correctly? 


MOCKS, SNAPSHOT
*/