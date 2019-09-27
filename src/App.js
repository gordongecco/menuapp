import React, { Component } from 'react';

import MenuDraggable from './MenuDraggable';

const menu1 = [
  { name: 'menu 1', parent: '', color: 'blue' },
  { name: 'menu 2', parent: '', color: 'red' },
  { name: 'menu 3', parent: 'menu 5', color: 'green' },
  { name: 'menu 4', parent: '', color: 'yellow' },
  { name: 'menu 5', parent: '', color: 'pink' },
  { name: 'menu 6', parent: 'menu 5', color: 'pink' },
  { name: 'menu 7', parent: 'menu 6', color: 'green' },
  { name: 'menu 8', parent: '', color: 'purple' },
  { name: 'menu 9', parent: '', color: 'red' },
  { name: 'menu 10', parent: 'menu 9', color: 'yellow' },
];
const menu2 = [
  { name: 'gizu1', parent: '', color: 'blue' },
  { name: 'bali2', parent: '', color: 'red' },
  { name: 'jani3', parent: '', color: 'green' },
  { name: 'dani4', parent: '', color: 'yellow' },
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
