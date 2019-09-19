import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    this.state = {
      menuItemsArray: this.props.menuItems,
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
    // ev.preventDefault();
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

  getItems(array, child, parent) {
    const newArray = array.map((item, index) => {
      if (item.child == '' && parent == '') {
        console.log('1');
        return (
          <li
            key={index}
            style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
            draggable="true"
            onDragStart={this.dragStart(index)}
            // onDrop={this.drop(index)}
            onDragOver={this.allowDrop}
            onDragEnd={this.ondragend}
            onDragEnter={this.ondragenter(index)}
          >
            {item.name}
          </li>
        );
      } else if (item.name == parent && item.child == '') {
        console.log('2');
        return (
          <li
            key={index}
            style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
            draggable="true"
            onDragStart={this.dragStart(index)}
            // onDrop={this.drop(index)}
            onDragOver={this.allowDrop}
            onDragEnd={this.ondragend}
            onDragEnter={this.ondragenter(index)}
          >
            {item.name}
          </li>
        );
      } else if (item.child != '' && parent == '') {
        console.log('3');
        return (
          <li
            key={index}
            style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
            draggable="true"
            onDragStart={this.dragStart(index)}
            // onDrop={this.drop(index)}
            onDragOver={this.allowDrop}
            onDragEnd={this.ondragend}
            onDragEnter={this.ondragenter(index)}
          >
            {item.name}
            <ul>{this.getItems(array, item.child, item.name)}</ul>
          </li>
        );
      } else {
        console.log('4');
        return;
      }
    });
    return newArray;
  }

  render() {
    const items = this.getItems(this.state.menuItemsArray, '', '');
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
