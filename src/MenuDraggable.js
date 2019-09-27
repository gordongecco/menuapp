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

    this.sortElements();
  }

  sortElements() {
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

    let array = [...this.props.menuItems];
    let sortedArray = [];

    array.map((item) => {
      if (item.parent == '') {
        sortedArray.push(item);
      }
    });

    array.map((item) => {
      seek(sortedArray, item);
    });

    console.log(sortedArray);
  }

  // sortElements2() {
  //   function seek(parent, obj) {
  //     array.map((item) => {
  //       if (parent.name == item.parent) {
  //         if (!parent.hasOwnProperty('children')) {
  //           item.children = [];
  //         }
  //         item.children.push(obj);
  //       } else {
  //         if (item.hasOwnProperty('children')) {
  //           seek(item.children, obj);
  //         }
  //       }
  //     });
  //   }

  //   let array = [...this.props.menuItems];
  //   let sortedArray = [];

  //   array.map((itemParent) => {
  //     if (itemParent.parent == '') {
  //       seek(itemParent, item);

  //       sortedArray.push(itemParent);
  //     }
  //   });

  //   array.map((item) => {});

  //   console.log(sortedArray);
  // }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index }, function() {});
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

  getItems(array) {
    let newArray = [];
    let array2 = [...array];

    newArray = array2.map((item, index) => {
      if (item.parent == '') {
        array2[index].flag = false;
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
            <ul></ul>
          </li>
        );
      }
    });

    return newArray;
  }

  render() {
    const items = this.getItems(this.state.menuItemsArray);

    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
