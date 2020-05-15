import React, { useState } from 'react';

const ColourChanger = ({render}) => {
  const [ colour, setColour] = useState('#006400')

  return (
    <div onClick={handleColourChange}>

    {render(colour)}
    </div>
  )
  function handleColourChange() {
    setColour('blue');
  }
}

const Square = ({colour}) => {
  return (
    <button style={{
      backgroundColor: `${colour}`,
      width: '100px',
      height: '100px'
    }}/>
  )
}

const Text = ({colour}) => {
  return (
    <h1 style={{color: `${colour}`}}>COLOURS!</h1>
  )
}

const ChangingSquare = () => {
  return (
    <ColourChanger render={colour => <Square colour={colour}/>}/>
  )
}

const ChangingText = () => {
  return (
    <ColourChanger render={colour => <Text colour={colour}/>} />
  )
}

export {
  ChangingSquare,
  ChangingText
};
