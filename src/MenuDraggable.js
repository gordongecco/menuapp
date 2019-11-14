import React, { Component } from 'react';

export function sum(a, b) {
  return a + b;
}

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);
    this.valami = this.valami.bind(this);

    this.oneDimArray = JSON.parse(JSON.stringify(this.props.menuItems));
    this.state = {
      menuItemsArray: this.sortElements(this.oneDimArray),
      active: null,
      activeItemIndex: null,
      number: 0,
    };
  }

  sortElements(oneDimArray) {
    let array = JSON.parse(JSON.stringify(oneDimArray));

    function sort(item) {
      array.map((elem) => {
        if (item.name == elem.parent) {
          if (!item.hasOwnProperty('children')) {
            item.children = [];
          }
          item.children.push(elem);
          sort(elem);
        }
      });
    }

    const result = array.filter((item) => item.parent == '');
    result.map((item) => {
      sort(item);
    });

    return result;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.stopPropagation();
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index, number: 55 });
  };

  valami(a) {
    return a;
  }
  drop = (targetId) => (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (this.state.active) {
      const itemIndex = this.oneDimArray.findIndex(
        (item) => item.name == this.state.activeItemIndex,
      );
      const targetIndex = this.oneDimArray.findIndex((item) => item.name == targetId);

      if (!(this.oneDimArray[targetIndex].name == this.oneDimArray[itemIndex].parent)) {
        const temp = this.oneDimArray[targetIndex].name;
        const color = this.oneDimArray[targetIndex].color;
        this.oneDimArray[targetIndex].name = this.oneDimArray[itemIndex].name;
        this.oneDimArray[itemIndex].name = temp;
        this.oneDimArray[targetIndex].color = this.oneDimArray[itemIndex].color;
        this.oneDimArray[itemIndex].color = color;

        const t = this.sortElements(this.oneDimArray);

        this.setState({ menuItemsArray: t }, () => {});
        // this.setState({ activeItemIndex: targetIndex });
      }
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
                  id={item.name}
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
          id={item.name}
          key={index}
          style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
          draggable="true"
          onDragStart={this.dragStart(item.name)}
          onDrop={this.drop(item.name)}
          onDragOver={this.allowDrop}
          onDragEnd={this.ondragend}
          // onDragEnter={this.ondragenter(item.name)}
          onClick={() => this.valami(2)}
        >
          {item.name}
          <br></br>
          {makeTree(item)}
        </li>
      );
    });
    return newArray;
  }

  onClick = (e) => {
    const newNumber = ++this.state.number;
    this.setState({ number: newNumber });
  };

  render() {
    const items = this.getItems();

    return (
      <div>
        <button id="b1" onClick={this.onClick}>
          {this.state.number}
        </button>
        sasa
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
