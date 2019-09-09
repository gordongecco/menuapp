import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItemsArray: [
        { name: 'menu 1', id: '1', color: 'blue' },
        { name: 'menu 2', id: '2', color: 'red' },
        { name: 'menu 3', id: '3', color: 'green' },
        { name: 'menu 4', id: '4', color: 'yellow' },
      ],
    };
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

  drop = (target) => (ev) => {
    ev.preventDefault();
    var menuItem = ev.dataTransfer.getData('text/plain');
    const targetIndex = this.state.menuItemsArray.findIndex((item)=>(item.id === target));
    const itemIndex = this.state.menuItemsArray.findIndex((item)=>(item.id === menuItem));
   let array = this.state.menuItemsArray;
   const temp = array[targetIndex];
   array[targetIndex] = array[itemIndex];
   array[itemIndex] = temp;
   this.setState({menuItemsArray: array});
  };

  render() {
    const items = this.state.menuItemsArray.map((item) => {
      return (
        <li
          id={item.id}
          draggable="true"
          onDragStart={this.drag}
          style={{ backgroundColor: item.color, width: 90 }}
          onDrop={this.drop(item.id)}
          onDragOver={this.allowDrop}
        >
          {item.name}
        </li>
      );
    });

    return (
      <div>
        <ul
          style={{ listStyleType: 'none' }}
          id="ul1"
        >
          {items}
        </ul>
      </div>
    );
  }
}
