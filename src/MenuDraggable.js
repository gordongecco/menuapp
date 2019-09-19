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
  };

  ondragenter = (target) => (ev) => {
    ev.preventDefault();
    const itemIndex = this.state.activeItemIndex;
    const targetIndex = target;
    if (this.state.active) {
      let array = this.state.menuItemsArray;
      const temp = array[targetIndex];
      array[targetIndex] = array[itemIndex];
      array[itemIndex] = temp;
      this.setState({ menuItemsArray: array });
      this.setState({ activeItemIndex: targetIndex });
    }
  };

  ondragend(ev) {
    this.setState({ active: null, activeItemIndex: null });
  }

  render() {
    const items = this.state.menuItemsArray.map((item, index) => {
      return (
        <li
          key={index}
          draggable="true"
          onDragStart={this.dragStart(index)}
          style={{ backgroundColor: item.color, width: 90, height: 30 }}
          onDrop={this.drop(index)}
          onDragOver={this.allowDrop}
          onDragEnd={this.ondragend}
          onDragEnter={this.ondragenter(index)}
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
