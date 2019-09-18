import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    this.state = {
      menuItemsArray: [
        { name: 'menu 1', color: 'blue' },
        { name: 'menu 2', color: 'red' },
        { name: 'menu 3', color: 'green' },
        { name: 'menu 4', color: 'yellow' },
      ],
      active: null,
      activeItemIndex: null,
    };
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index });
  };

  drop = (target) => (ev) => {
    ev.preventDefault();
    const itemIndex = this.state.activeItemIndex;
    const targetIndex = target;
    if (this.state.active) {
      let array = this.state.menuItemsArray;
      const temp = array[targetIndex];
      array[targetIndex] = array[itemIndex];
      array[itemIndex] = temp;
      this.setState({ menuItemsArray: array });
    }
  };

  ondragend(ev) {
    this.setState({ active: null, activeItemIndex: null });
  }

  render() {
    const items = this.state.menuItemsArray.map((item, index) => {
      return (
        <li
          draggable="true"
          onDragStart={this.dragStart(index)}
          style={{ backgroundColor: item.color, width: 90 }}
          onDrop={this.drop(index)}
          onDragOver={this.allowDrop}
          onDragEnd={this.ondragend}
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
