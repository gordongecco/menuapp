import React, { Component } from 'react';

import MenuDraggable from './MenuDraggable';

const menu1 = [
  { name: 'menu 1', parent: '', color: 'blue' },
  { name: 'menu 2', parent: '', color: 'red' },
  { name: 'menu 3', parent: 'menu 15', color: 'green' },
  { name: 'menu 4', parent: '', color: 'yellow' },
  { name: 'menu 5', parent: '', color: 'pink' },
  { name: 'menu 6', parent: 'menu 5', color: 'pink' },
  { name: 'menu 7', parent: '', color: 'green' },
  { name: 'menu 8', parent: '', color: 'purple' },
  { name: 'menu 9', parent: '', color: 'red' },
  { name: 'menu 10', parent: 'menu 6', color: 'yellow' },
  { name: 'menu 11', parent: 'menu 6', color: 'blue' },
  { name: 'menu 12', parent: '', color: 'purple' },
  { name: 'menu 13', parent: '', color: 'green' },
  { name: 'menu 14', parent: '', color: 'blue' },
  { name: 'menu 15', parent: '', color: 'yellow' },
  { name: 'menu 16', parent: '', color: 'red' },
  { name: 'menu 17', parent: '', color: 'green' },
  { name: 'menu 18', parent: '', color: 'pink' },
  { name: 'menu 19', parent: 'menu 15', color: 'purple' },
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
