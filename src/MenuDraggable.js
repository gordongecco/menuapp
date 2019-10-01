import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    // this.sortedArray = this.sortElements(this.props.menuItems);
    this.state = {
      menuItemsArray: this.sortElements(this.props.menuItems),
      active: null,
      activeItemIndex: null,
    };
  }

  sortElements(array) {
    function seek(array, obj) {
      array.map((item) => {
        if (item.name == obj.parent) {
          if (!item.hasOwnProperty('children')) {
            item.children = [];
          }
          item.children.push(obj);
        } else {
          if (item.hasOwnProperty('children')) {
            seek(item.children, obj);
          }
        }
      });
    }

    let sortedArray = [];

    array.map((item) => {
      if (item.parent == '') {
        sortedArray.push(item);
      }
    });

    array.map((item) => {
      seek(sortedArray, item);
    });

    return sortedArray;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index }, function() {});
  };

  drop = (targetId) => (ev) => {
    ev.preventDefault();
    if (this.state.active) {
      let array = [...this.props.menuItems];
      const itemIndex = array.findIndex((item) => item.name == this.state.activeItemIndex);
      const targetIndex = array.findIndex((item) => item.name == targetId);

      const temp = array[targetIndex].name;
      array[targetIndex].name = array[itemIndex].name;
      array[itemIndex].name = temp;

      console.log(JSON.parse(JSON.stringify(this.props.menuItems)));

      this.setState({ menuItemsArray: this.sortElements(array) }, () => {});
      // this.setState({ activeItemIndex: targetIndex });
    }

    console.log(JSON.parse(JSON.stringify(this.sortedArray)));
  };

  ondragenter = (targetId) => (ev) => {
    ev.preventDefault();
  };

  ondragend(ev) {
    this.setState({ active: null, activeItemIndex: null });
  }

  getItems() {
    let newArray = [];

    const dragStart = this.dragStart;
    const onDrop = this.drop;
    const onDragOver = this.onDragOver;
    const onDragEnd = this.onDragEnd;

    function makeTree(item) {
      if (!item.hasOwnProperty('children')) {
        return;
      } else {
        return (
          <ul style={{ listStyleType: 'none' }}>
            {item.children.map((item, index) => {
              return (
                <li
                  key={index}
                  draggable="true"
                  style={{
                    backgroundColor: item.color,
                    width: 90,
                    height: 30,
                    textAlign: 'center',
                  }}
                  onDragStart={dragStart(item.name)}
                  onDrop={onDrop(item.name)}
                  onDragOver={onDragOver}
                  onDragEnd={onDragEnd}
                >
                  {item.name}
                  <br></br>
                  {makeTree(item)}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    newArray = this.state.menuItemsArray.map((item, index) => {
      return (
        <li
          key={index}
          style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
          draggable="true"
          onDragStart={this.dragStart(item.name)}
          onDrop={this.drop(item.name)}
          onDragOver={this.allowDrop}
          onDragEnd={this.ondragend}
          // onDragEnter={this.ondragenter(item.name)}
        >
          {item.name}
          <br></br>
          {makeTree(item)}
        </li>
      );
    });
    return newArray;
  }

  render() {
    const items = this.getItems();

    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
