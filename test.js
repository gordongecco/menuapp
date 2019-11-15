import { sum } from './src/MenuDraggable';
import MenuDraggable from './src/MenuDraggable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { wrap } from 'module';
import { render, fireEvent, waitForElement, createEvent } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import TestUtils from 'react-dom/test-utils';
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

var DndSimulatorDataTransfer = function() {
  this.data = {};
};

/*!
 * \brief Controls the feedback currently given to the user.
 *
 * Must be any of the following strings:
 *
 * - "move"
 * - "copy"
 * - "link"
 * - "none"
 *
 * The default is "move".
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
 */
DndSimulatorDataTransfer.prototype.dropEffect = 'move';

/*!
 * \brief Controls which kind of drag/drop operatins are allowed.
 *
 * Must be any of the following strings:
 *
 * - "none"
 * - "copy"
 * - "copyLink"
 * - "copyMove"
 * - "link"
 * - "linkMove"
 * - "move"
 * - "all"
 * - "uninitialized"
 *
 * The default is "all".
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed
 */
DndSimulatorDataTransfer.prototype.effectAllowed = 'all';

/*!
 * \brief List of files being dragged.
 *
 * This property will remain an empty list when the drag and drop operation
 * does not involve any files.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/files
 */
DndSimulatorDataTransfer.prototype.files = [];

/*!
 * \brief Read-only list of items being dragged.
 *
 * This is actually a list of \see DataTransferItem
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
 *
 * This property will remain an empty list when the drag and drop
 * operation does not involve any files.
 */
DndSimulatorDataTransfer.prototype.items = [];

/*!
 * \brief Read-only list of data formats that were set in
 *           the "dragstart" event.
 *
 * The order of the formats is the same order as the data
 * included in the drag operation.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
 */
DndSimulatorDataTransfer.prototype.types = [];

/*!
 * \brief Removes all data.
 *
 * \param format Optional: Only remove the data associated with this format.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/clearData
 */
DndSimulatorDataTransfer.prototype.clearData = function(format) {
  if (format) {
    delete this.data[format];

    var index = this.types.indexOf(format);
    delete this.types[index];
    delete this.data[index];
  } else {
    this.data = {};
  }
};

/*!
 * \brief Sets the drag operation"s drag data to the specified data
 *          and type.
 *
 * \param format A string describing the data"s format.
 * \param data   The data to store (formatted according to the
 *                 specified format).
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
 */
DndSimulatorDataTransfer.prototype.setData = function(format, data) {
  this.data[format] = data;
  this.items.push(data);
  this.types.push(format);
};

/*!
 * \brief Retrives drag dta for the specified type.
 *
 * \param format A string describing the type of data to retrieve.
 *
 * \returns The drag data for the specified type, otherwise an empty string.
 *
 * \see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
 */
DndSimulatorDataTransfer.prototype.getData = function(format) {
  if (format in this.data) {
    return this.data[format];
  }

  return '';
};

/*!
 * \brief Sets a custom image to be displayed during dragging.
 *
 * \param img         An image elment to use for the drag feedback image.
 * \param xOffset    A long indicating the horizontal offset within the image.
 * \param yOffset   A long indicating the veritcal offset within the image.
 */
DndSimulatorDataTransfer.prototype.setDragImage = function(img, xOffset, yOffset) {
  /* since simulation doesn"t replicate the visual effects, there is
  no point in implementing this */
};

const DndSimulator = {
  /*!
   * \brief Simulates dragging one element on top of the other.
   *
   * Specified elements can be CSS selectors.
   *
   * \param sourceElement The element to drag to the target element.
   * \param targetElement The element the source element should be
   *                        dragged to.
   */
  simulate: function(sourceElement, targetElement) {
    /* if strings are specified, assume they are CSS selectors */
    if (typeof sourceElement == 'string') {
      sourceElement = document.querySelector(sourceElement);
    }

    if (typeof targetElement == 'string') {
      targetElement = document.querySelector(targetElement);
    }

    /* get the coordinates of both elements, note that
      left refers to X, and top to Y */
    var sourceCoordinates = sourceElement.getBoundingClientRect();
    var targetCoordinates = targetElement.getBoundingClientRect();

    /* simulate a mouse down event on the coordinates
      of the source element */
    var mouseDownEvent = this.createEvent('mousedown', {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
    });

    sourceElement.dispatchEvent(mouseDownEvent);

    /* simulate a drag start event on the source element */
    var dragStartEvent = this.createEvent('dragstart', {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
      dataTransfer: new DndSimulatorDataTransfer(),
    });

    sourceElement.dispatchEvent(dragStartEvent);

    /* simulate a drag event on the source element */
    var dragEvent = this.createEvent('drag', {
      clientX: sourceCoordinates.left,
      clientY: sourceCoordinates.top,
    });

    sourceElement.dispatchEvent(dragEvent);

    /* simulate a drag enter event on the target element */
    var dragEnterEvent = this.createEvent('dragenter', {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dragEnterEvent);

    /* simulate a drag over event on the target element */
    var dragOverEvent = this.createEvent('dragover', {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dragOverEvent);

    /* simulate a drop event on the target element */
    var dropEvent = this.createEvent('drop', {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    targetElement.dispatchEvent(dropEvent);

    /* simulate a drag end event on the source element */
    var dragEndEvent = this.createEvent('dragend', {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
      dataTransfer: dragStartEvent.dataTransfer,
    });

    sourceElement.dispatchEvent(dragEndEvent);

    /* simulate a mouseup event on the target element */
    var mouseUpEvent = this.createEvent('mouseup', {
      clientX: targetCoordinates.left,
      clientY: targetCoordinates.top,
    });

    targetElement.dispatchEvent(mouseUpEvent);
  },

  /*!
   * \brief Creates a new fake event ready to be dispatched.
   *
   * \param eventName The type of event to create.
   *                    For example: "mousedown".
   * \param options    Dictionary of options for this event.
   *
   * \returns An event ready for dispatching.
   */
  createEvent: function(eventName, options) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, null);

    event.view = window;
    // event.detail = 0;
    event.ctlrKey = false;
    event.altKey = false;
    event.shiftKey = false;
    event.metaKey = false;
    event.button = 0;
    event.relatedTarget = null;

    /* if the clientX and clientY options are specified,
      also calculated the desired screenX and screenY values */
    if (options.clientX && options.clientY) {
      event.screenX = window.screenX + options.clientX;
      event.screenY = window.screenY + options.clientY;
    }

    /* copy the rest of the options into
      the event object */
    for (var prop in options) {
      event[prop] = options[prop];
    }

    return event;
  },
};

test.skip('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test.skip('enzyme test shallow rendering', () => {
  const wrapper = shallow(<MenuDraggable menuItems={menu1} />);
  expect(wrapper.contains('sasa')).toBe(true);
});

test.skip('enzyme test DOM rendering', () => {
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
  const { getByText, getById, container } = render(<MenuDraggable menuItems={menu1} />);
  expect(getByText('menu 2').textContent).toBe('menu 2');
  expect(document.getElementById('menu 2').textContent).toBe('menu 2');

  expect(container).toMatchSnapshot();
  DndSimulator.simulate(getByText('menu 1'), getByText('menu 2'));
  expect(document.getElementById('b1').textContent).toBe('55');

  // console.log(container.textContent);
  // const myEvent = createEvent.dragStart(getByText('menu 2'));
  // fireEvent(
  //   getByText('menu 2'),
  //   new MouseEvent('dragstart', {
  //     bubbles: true,
  //     cancelable: true,
  //     dataTransfer: { DataTransferItemList: [] },
  //   }),
  // );
  // fireEvent(getByText('menu 2'), myEvent);
  expect(container).toMatchSnapshot();
});

test('enzyme test DOM rendering', () => {
  const wrapper = mount(<MenuDraggable menuItems={menu1} />);
  expect(wrapper.state().active).toBe(null);
  expect(wrapper.exists({ id: 'menu 1' })).toBe(true);
  const startItem = wrapper.find({ id: 'menu 1' }).getDOMNode();
  const targetItem = wrapper.find({ id: 'menu 2' }).getDOMNode();
  expect(wrapper.state().number).toBe(0);
  wrapper.instance().onClick();
  expect(wrapper.state().number).toBe(1);
  expect(wrapper.find({ id: 'b1' }).html()).toEqual('<button id="b1">1</button>');
  expect(wrapper.find({ id: 'b1' }).text()).toMatch('1');
  expect(wrapper.find({ id: 'menu 1' }).invoke('onClick')(2)).toBe(2);
  let Dt = new DndSimulatorDataTransfer();
  // wrapper
  //   .find({ id: 'menu 1' })
  //   .simulate('dragstart', { dataTransfer: { setData: function(a, b) {} } });
  wrapper.find({ id: 'menu 1' }).simulate('dragstart', { dataTransfer: Dt });
  expect(wrapper.state().active).toBe('moving');
});
