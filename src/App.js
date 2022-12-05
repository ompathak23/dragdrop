import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const draggingItem = useRef();
  const dragOverItem = useRef();

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

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    console.log(e.target.innerHTML);
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
    const listCopy = [...list];
    console.log(draggingItem.current, dragOverItem.current);
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
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDragEnter(e, index)}
            key={index}
            draggable
          >
            {item}
          </h1>
        ))}
    </>
  );
};

export default App;