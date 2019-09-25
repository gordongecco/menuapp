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

    // console.log(this.props.menuItems);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dragStart = (index) => (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target);
    this.setState({ active: 'moving', activeItemIndex: index }, function() {
      console.log('activeIndex' + this.state.activeItemIndex);
    });
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

  getItems(array, child, parent, itemIndex = 0) {
    let newArray = [];

    newArray = array.map((item, index) => {
      if (array[index].flag && item.parent == '') {
        array[index].flag = false;
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

    // let Elem = React.createElement(newArray[1].type);
    let Elem2 = <Elem {...newArray[1].props}>dadad</Elem>;
    // React.Children.map(Elem2.props.children, (innerChild) => {
    //   if (Elem2.type == 'ul') {
    //     return (
    //       <Elem2.type {...Elem2.props}>
    //         {innerChild}
    //         <ul>
    //           <li>jhjhjh</li>
    //         </ul>
    //       </Elem2.type>
    //     );
    //   }
    // });
    newArray[12] = Elem2;
    console.log(newArray[12]);
    console.log(newArray[1]);
    return newArray;
  }

  // getItems(array, child, parent, itemIndex = 0) {
  //   const newArray = array.map((item, index) => {
  //     if (item.child == '' && parent == '' && array[index].flag) {
  //       console.log('1,' + index + ' :' + array[index].flag);
  //       array[index].flag = false;
  //       return (
  //         <li
  //           key={index}
  //           style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
  //           draggable="true"
  //           onDragStart={this.dragStart(index)}
  //           // onDrop={this.drop(index)}
  //           onDragOver={this.allowDrop}
  //           onDragEnd={this.ondragend}
  //           onDragEnter={this.ondragenter(index)}
  //         >
  //           {item.name}
  //         </li>
  //       );
  //     } else if (item.name == child && item.child == '' && array[index].flag) {
  //       console.log('2,' + index);
  //       array[index].flag = false;
  //       return (
  //         <li
  //           key={index}
  //           style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
  //           draggable="true"
  //           onDragStart={this.dragStart(index)}
  //           // onDrop={this.drop(index)}
  //           onDragOver={this.allowDrop}
  //           onDragEnd={this.ondragend}
  //           onDragEnter={this.ondragenter(index)}
  //         >
  //           {item.name}
  //         </li>
  //       );
  //     } else if (item.child != '' && parent == '' && array[index].flag) {
  //       console.log('3,' + index);
  //       array[index].flag = false;
  //       return (
  //         <li
  //           key={index}
  //           style={{ backgroundColor: item.color, width: 90, height: 30, textAlign: 'center' }}
  //           draggable="true"
  //           onDragStart={this.dragStart(index)}
  //           // onDrop={this.drop(index)}
  //           onDragOver={this.allowDrop}
  //           onDragEnd={this.ondragend}
  //           onDragEnter={this.ondragenter(index)}
  //         >
  //           {item.name}
  //           <ul>
  //             <div style={{ width: 120, height: 60, padding: 10 }}>
  //               {this.getItems(array, item.child, item.name, index)}
  //             </div>
  //           </ul>
  //         </li>
  //       );
  //     } else {
  //       console.log('4,' + index);
  //       return;
  //     }
  //   });
  //   return newArray;
  // }

  render() {
    let array = this.state.menuItemsArray;
    array.forEach((element) => {
      element.flag = true;
    });
    const items = this.getItems(this.state.menuItemsArray, '', '');
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{items}</ul>
      </div>
    );
  }
}
