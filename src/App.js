import React from 'react';

function Menu1() {
  return (
    <div style={{ backgroundColor: 'red', width: 90 }} id="m1" draggable="true" onDragStart={drag}>
      Menu 1
    </div>
  );
}
function Menu2() {
  return (
    <div style={{ backgroundColor: 'blue', width: 90 }} id="m2" draggable="true" onDragStart={drag}>
      Menu 2
    </div>
  );
}
function Menu3() {
  return (
    <div
      style={{ backgroundColor: 'green', width: 90 }}
      id="m3"
      draggable="true"
      onDragStart={drag}
    >
      Menu 3
    </div>
  );
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.id);
}

const drop = (m) => (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text/plain');
  console.log(data);
  console.log(m);
  ev.target.appendChild(document.getElementById(data));
};

function App() {
  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        <li id="l1" onDrop={drop} onDragOver={allowDrop}>
          <Menu1 />
        </li>
        <li id="l2" onDrop={drop} onDragOver={allowDrop}>
          <Menu2 />
        </li>
        <li id="l3" onDrop={drop} onDragOver={allowDrop}>
          <Menu3 />
        </li>
      </ul>
      <div id="div2" onDrop={drop('div2')} onDragOver={allowDrop}>
        gfgfgfgfgfgf
      </div>
    </div>
  );
}

export default App;
