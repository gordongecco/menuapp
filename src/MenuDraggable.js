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
    console.log('cél elem indexe: '+target);
    console.log('kezdő elem indexe: '+this.state.activeItemIndex);

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


    function makeTree(item){

      if (!item.hasOwnProperty('children')) {
       return;
      }else{
        return(
          <ul style={{listStyleType:'none'}}>
            {item.children.map((item,index)=>{
              return(
                  <li  key={index}
                     draggable="true"
                     >
                      <div style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}>
            {item.name}
            <br></br>
              {makeTree(item)}
            </div>
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
            draggable="true"
            onDragStart={this.dragStart(index)}
            // onDrop={this.drop(index)}
            onDragOver={this.allowDrop}
            onDragEnd={this.ondragend}
            onDragEnter={this.ondragenter(index)}
          >
            <div style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}>
            {item.name}
            <br></br>
              {makeTree(item)}
            </div>
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
