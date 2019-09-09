import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItemsArray: [
        { name: 'menu 1', id: '1', color: 'blue' },
        { name: 'menu 2', id: '2', color: 'red' },
        { name: 'menu 3', id: '3', color: 'green' },
      ],
    };
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

  drop = (m) => (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text/plain');
    console.log('elem:' + data);
    console.log('hely: ' + m);
    const item = this.state.menuItemsArray[data - 1];
    let array = this.state.menuItemsArray;
    array.splice(m - 1, 0, item);
    this.setState({ menuItemsArray: array });
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
          // onDrop={this.drop('ul1')}
          // onDragOver={this.allowDrop}
        >
          {items}
        </ul>
        <div id="div2" onDrop={this.drop('div2')} onDragOver={this.allowDrop}>
          gfgfgfgfgfgf
        </div>
      </div>
    );
  }
}
