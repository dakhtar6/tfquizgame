import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Intro from './Intro';

configure({ adapter: new Adapter() });

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

  describe('when you click on the begin button', () => {
    it('calls the handleClick function', () => {
      const wrapper = mount(
        <Intro isLoaded={true} totalNumQuestions={10} />
      );
      const instance = wrapper.instance(); 
      const spy = jest.spyOn(instance, 'handleClick')
      const clickEvent = {target: {closest: () => wrapper.find('button').closest('section')}}; 
      wrapper.find('button').simulate('click', clickEvent);
      expect(spy).toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});