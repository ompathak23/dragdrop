import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const draggingItem = useRef(); // To keep track of the item by its position
  const dragOverItem = useRef(); // To keep track of the item over which the other item is hovering

  // List of outlines

  const [list, setList] = useState([
    'Shopping in Barcelona',
    'Famous Shopping Streets',
    'Shopping Malls',
    'Markets',
    'Opening times',
    'Sales Tax Refunds',
    'You may also be interested in',
    'Where to Stay'
  ]);

  // This function keeps tracks of the item being dragged;
  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    //console.log(e.target.innerHTML);
  };

  // This function keeps tracks of the item over which the dragged item is hovering
  // This also reshuffles the list whenever we drag an item over another item
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    //console.log(e.target.innerHTML);

    const listCopy = [...list];
    //console.log(draggingItem.current, dragOverItem.current);
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setList(listCopy);
  };

  return (
    <>
      <h1 id="title">Outlines</h1>
      {list &&
        list.map((item, index) => (
          <h1
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()} // To prevent shadow from going back to its original position
            onDragEnter={(e) => handleDragEnter(e, index)}
            key={index}
            draggable // draggable prop makes the children of the list draggable
          >
            {item}
          </h1>
        ))}
    </>
  );
};

export default App;