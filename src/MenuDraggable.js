import React, { Component } from 'react';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    this.oneDimArray = JSON.parse(JSON.stringify(this.props.menuItems));
    this.state = {
      menuItemsArray: this.sortElements(this.oneDimArray),
      active: null,
      activeItemIndex: null,
    };

  }

 

  sortElements(firstArray) {
    let array = JSON.parse(JSON.stringify(firstArray));

    const t = array.filter((item) => item.parent == '');

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

    t.map((item) => {
      sort(item);
    });
    return t;
    }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.stopPropagation();
    // console.log('startitem:' + index);
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index });
  };

  drop = (targetId) => (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.state.active) {
      const itemIndex = this.oneDimArray.findIndex(
        (item) => item.name == this.state.activeItemIndex,
      );
      const targetIndex = this.oneDimArray.findIndex((item) => item.name == targetId);
      console.log('item name:' + this.state.activeItemIndex);
      console.log('targetname:' + targetId);
      // console.log('target index:' + targetIndex);

      if (!(this.oneDimArray[targetIndex].name == this.oneDimArray[itemIndex].parent)) {
        const temp = this.oneDimArray[targetIndex].name;
        const color = this.oneDimArray[targetIndex].color;
        this.oneDimArray[targetIndex].name = this.oneDimArray[itemIndex].name;
        this.oneDimArray[itemIndex].name = temp;
        this.oneDimArray[targetIndex].color = this.oneDimArray[itemIndex].color;
        this.oneDimArray[itemIndex].color = color;

        console.log(JSON.parse(JSON.stringify(this.oneDimArray)));
        const t = this.sortElements(this.oneDimArray);
        console.log(JSON.parse(JSON.stringify(t)));

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
