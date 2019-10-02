import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    this.oneDimensionArray = JSON.parse(JSON.stringify(this.props.menuItems));
    this.state = {
      menuItemsArray: this.sortElements(this.oneDimensionArray),
      active: null,
      activeItemIndex: null,
    };
  }

  sortElements(arrayChange) {
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
    let array = JSON.parse(JSON.stringify(arrayChange));

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
    ev.stopPropagation();
    console.log('startitem:' + index);
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index }, function() {});
  };

  drop = (targetId) => (ev) => {
    ev.preventDefault();
    if (this.state.active) {
      let array = JSON.parse(JSON.stringify(this.oneDimensionArray));
      console.log(JSON.parse(JSON.stringify(array)));

      const itemIndex = array.findIndex((item) => item.name == this.state.activeItemIndex);
      const targetIndex = array.findIndex((item) => item.name == targetId);
      console.log('item name:' + this.state.activeItemIndex);
      console.log('targetname:' + targetId);
      console.log('target index:' + targetIndex);

      const temp = array[targetIndex].name;
      const color = array[targetIndex].color;
      array[targetIndex].name = array[itemIndex].name;
      array[itemIndex].name = temp;
      array[targetIndex].color = array[itemIndex].color;
      array[itemIndex].color = color;

      this.oneDimensionArray = array;
      const t = this.sortElements(this.oneDimensionArray);
      console.log(JSON.parse(JSON.stringify(t)));

      this.setState({ menuItemsArray: t }, () => {});
      // this.setState({ activeItemIndex: targetIndex });
    }
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

    let arrayFromState = JSON.parse(JSON.stringify(this.state.menuItemsArray));
    newArray = arrayFromState.map((item, index) => {
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
