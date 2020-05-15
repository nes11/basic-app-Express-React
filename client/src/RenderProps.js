import React, { useState } from 'react';

const Mouse = ({render}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div style={{ height: '50vh' }} onMouseMove={handleMouseMove}>
      <h1>Move the mouse around!</h1>
      {render(position)}
    </div>
  );

  function handleMouseMove(e) {
    setPosition({ x: e.clientX, y: e.clientY});
  }
}

const Cat = (props) => {
  const mouse = props.mouse;
  return (
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIZMDzpEL8AleTnHIOgbdbVn8HRhyy8a3bA6sWO62sATkGid_t&usqp=CAU" alt='' style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
  )
}

const CatChaseMouse = () => {
  return (
    <Mouse render={mouse => <Cat mouse={mouse}/>}/>
  )
}
export default CatChaseMouse;
