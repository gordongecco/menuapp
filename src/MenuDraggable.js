import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);

    this.randomId = Math.floor(Math.random() * 90000) + 10000;
    this.state = {
      menuItemsArray: [
        { name: 'menu 1', color: 'blue' },
        { name: 'menu 2', color: 'red' },
        { name: 'menu 3', color: 'green' },
        { name: 'menu 4', color: 'yellow' },
      ],
    };
  }

  // allowDrop(ev) {
  //   ev.preventDefault();
  // }
  allowDrop = (target) => (ev) => {
    ev.preventDefault();
    const itemIndex = ev.dataTransfer.getData('text/plain');
    const targetIndex = target;
    let draggableItemId = ev.dataTransfer.getData('draggableId');
    console.log(targetIndex);
    if (this.randomId == draggableItemId) {
      let array = this.state.menuItemsArray;
      const temp = array[targetIndex];
      array[targetIndex] = array[itemIndex];
      array[itemIndex] = temp;
      this.setState({ menuItemsArray: array });
    }
  };

  dragStart = (index, randomId) => (ev) => {
    ev.dataTransfer.setData('text/plain', index);
    ev.dataTransfer.setData('draggableId', randomId);
  };

  drop = (target) => (ev) => {
    ev.preventDefault();
    const itemIndex = ev.dataTransfer.getData('text/plain');
    const targetIndex = target;
    let draggableItemId = ev.dataTransfer.getData('draggableId');
    console.log(itemIndex);
    if (this.randomId == draggableItemId) {
      let array = this.state.menuItemsArray;
      const temp = array[targetIndex];
      array[targetIndex] = array[itemIndex];
      array[itemIndex] = temp;
      this.setState({ menuItemsArray: array });
    }
  };

  render() {
    const items = this.state.menuItemsArray.map((item, index) => {
      return (
        <li
          draggable="true"
          onDragStart={this.dragStart(index, this.randomId)}
          style={{ backgroundColor: item.color, width: 90 }}
          onDrop={this.drop(index)}
          // onDragOver={this.allowDrop}
          onDragOver={this.allowDrop(index)}
        >
          {item.name}
        </li>
      );
    });

    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
