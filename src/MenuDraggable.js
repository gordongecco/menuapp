import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItemsArray: [
        { name: 'menu 1', color: 'blue' },
        { name: 'menu 2', color: 'red' },
        { name: 'menu 3', color: 'green' },
        { name: 'menu 4', color: 'yellow' },
      ],
    };
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (id) => (ev) => {
    ev.dataTransfer.setData('text/plain', id);
  };

  drop = (target) => (ev) => {
    ev.preventDefault();
    var menuItem = ev.dataTransfer.getData('text/plain');
    const targetIndex = target;
    const itemIndex = menuItem;
    let array = this.state.menuItemsArray;
    const temp = array[targetIndex];
    array[targetIndex] = array[itemIndex];
    array[itemIndex] = temp;
    this.setState({ menuItemsArray: array });
  };

  render() {
    const items = this.state.menuItemsArray.map((item, index) => {
      return (
        <li
          draggable="true"
          onDragStart={this.dragStart(index)}
          style={{ backgroundColor: item.color, width: 90 }}
          onDrop={this.drop(index)}
          onDragOver={this.allowDrop}
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
