import React, { Component } from 'react';
import { isJSXOpeningFragment } from '@babel/types';

export default class MenuDraggable extends Component {
  constructor(props) {
    super(props);
    this.ondragend = this.ondragend.bind(this);

    this.state = {
      menuItemsArray: this.props.menuItems,
      active: null,
      activeItemIndex: null,
    };

    this.sortedArray = this.sortElements();
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
    return sortedArray;
  }


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

    // newArray = array2.map((item, index) => {
    //   if (item.parent == '') {
    //     return (
    //       <li
    //         key={index}
    //         style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
    //         draggable="true"
    //         onDragStart={this.dragStart(index)}
    //         // onDrop={this.drop(index)}
    //         onDragOver={this.allowDrop}
    //         onDragEnd={this.ondragend}
    //         onDragEnter={this.ondragenter(index)}
    //       >
    //         {item.name}
    //         <ul></ul>
    //       </li>
    //     );
    //   }
    // });


    function makeTree(item){

      if (!item.hasOwnProperty('children')) {
       return;
      }else{
        return(
          <ul>
            {item.children.map(item=>{
              return(
                  <li
                     style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
                     draggable="true"
                     >
                      { item.name}
                      <br></br>
                      {makeTree(item)}
                  </li>
              );
            })}
          </ul>
          );
      }

    }


    newArray = this.sortedArray.map((item, index) => {
    
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
            <br></br>
              {makeTree(item)}
          </li>
        );
      
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
