import React, { Component } from 'react';

import MenuDraggable from './MenuDraggable';

const menu1 = [
  { name: 'menu 1', parent: '', color: 'blue', flag: true },
  { name: 'menu 2', parent: '', color: 'red', flag: true },
  { name: 'menu 3', parent: 'menu 5', color: 'green', flag: true },
  { name: 'menu 4', parent: '', color: 'yellow', flag: true },
  { name: 'menu 5', parent: '', color: 'pink', flag: true },
  { name: 'menu 6', parent: 'menu 7', color: 'pink', flag: true },
  { name: 'menu 7', parent: '', color: 'green', flag: true },
  { name: 'menu 8', parent: '', color: 'purple', flag: true },
  { name: 'menu 9', parent: 'menu 5', color: 'red', flag: true },
  { name: 'menu 10', parent: '', color: 'yellow', flag: true },
];
const menu2 = [
  { name: 'gizu1', child: '', color: 'blue' },
  { name: 'bali2', child: '', color: 'red' },
  { name: 'jani3', child: '', color: 'green' },
  { name: 'dani4', child: '', color: 'yellow' },
];

function App() {
  return (
    <div>
      <MenuDraggable menuItems={menu1} />
      {/* <MenuDraggable menuItems={menu2} /> */}
    </div>
  );
}

export default App;
