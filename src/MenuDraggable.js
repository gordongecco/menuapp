import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);

    this.ranId = Math.floor(Math.random() * 90000) + 10000;
    console.log('constr: ' + this.ranId);

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

  dragStart = (id, ranId) => (ev) => {
    ev.dataTransfer.setData('text/plain', id);
    ev.dataTransfer.setData('draggableId', ranId);
  };

  drop = (target) => (ev) => {
    ev.preventDefault();
    let menuItem = ev.dataTransfer.getData('text/plain');
    let draggableId = ev.dataTransfer.getData('draggableId');
    if (this.ranId == draggableId) {
      const targetIndex = target;
      const itemIndex = menuItem;
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
          onDragStart={this.dragStart(index, this.ranId)}
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
