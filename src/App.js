import React, { Component } from 'react';

import MenuDraggable from './MenuDraggable';

const menu1 = [
  { name: 'menu 1', child: '', color: 'blue' },
  { name: 'menu 2', child: '', color: 'red' },
  { name: 'menu 3', child: 'menu 5', color: 'green' },
  { name: 'menu 4', child: '', color: 'yellow' },
  { name: 'menu 5', child: '', color: 'pink' },
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
      <MenuDraggable menuItems={menu2} />
    </div>
  );
}

export default App;
