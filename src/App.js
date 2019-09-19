import React, { Component } from 'react';

import MenuDraggable from './MenuDraggable';

const menu1 = [
  { name: 'menu 1', color: 'blue' },
  { name: 'menu 2', color: 'red' },
  { name: 'menu 3', color: 'green' },
  { name: 'menu 4', color: 'yellow' },
];
const menu2 = [
  { name: 'gizu1', color: 'blue' },
  { name: 'bali2', color: 'red' },
  { name: 'jani3', color: 'green' },
  { name: 'dani4', color: 'yellow' },
];

function App() {
  return (
    <div>
      <MenuDraggable menuItems={menu1} />
      <MenuDraggable menuItems={menu2} />
    </div>
  );
}

export default App;
