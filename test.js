import { sum } from './src/MenuDraggable';
import MenuDraggable from './src/MenuDraggable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { wrap } from 'module';
import { render, fireEvent, waitForElement } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  wait,
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });
const menu1 = [
  { name: 'menu 1', parent: '', color: 'blue' },
  { name: 'menu 2', parent: '', color: 'red' },
  { name: 'menu 4', parent: '', color: 'yellow' },
  { name: 'menu 5', parent: '', color: 'pink' },
  { name: 'menu 6', parent: 'menu 4', color: 'pink' },
];
const expectedMenu = [
  { name: 'menu 1', parent: '', color: 'blue' },
  { name: 'menu 2', parent: '', color: 'red' },
  {
    name: 'menu 4',
    parent: '',
    color: 'yellow',
    children: [
      {
        color: 'pink',
        name: 'menu 6',
        parent: 'menu 4',
      },
    ],
  },
  { name: 'menu 5', parent: '', color: 'pink' },
];

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('enzyme test shallow rendering', () => {
  const wrapper = shallow(<MenuDraggable menuItems={menu1} />);
  expect(wrapper.contains('sasa')).toBe(true);
});

test('enzyme test DOM rendering', () => {
  const wrapper = mount(<MenuDraggable menuItems={menu1} />);
  const dragStartSpy = jest.spyOn(wrapper.instance(), 'dragStart');
  // expect(wrapper.instance().sortElements(menu1)).toEqual(expectedMenu);
  // expect(wrapper.state().active).toBe(null);
  // wrapper.setState({});
  wrapper.instance().dragStart();
  // expect(wrapper.find({ id: 'menu 2' })).toHaveLength(1);
  // wrapper.find({ id: 'menu 2' }).simulate('mousedown', { index: 'menu 2' });
  // wrapper.find({ id: 'menu 2' }).simulate('dragstart');
  expect(dragStartSpy).toHaveBeenCalled();
  // expect(wrapper.state().active).toBe('moving');
});

test('react testing library', () => {
  const { getByText } = render(<MenuDraggable menuItems={menu1} />);
  expect(getByText('menu 2').textContent).toBe('menu 2');
  // fireEvent(
  //   getByText('menu 2'),
  //   new MouseEvent('dragstart', {
  //     bubbles: true,
  //     cancelable: true,
  //   }),
  // );
});
