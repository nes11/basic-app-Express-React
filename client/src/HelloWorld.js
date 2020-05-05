import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
  const [ greeting, setGreeting ] = useState();
  const [ input , setInput ] = useState('https://swapi.dev/api/films/2/');

  useEffect(() => {
    fetchGreeting();
    // return () => {};
  }, []);

  const fetchGreeting = async() => {
    try {
      console.log(11111111, input)
      const response = await fetch(input);
      // console.log(222222222222, await response.json())

      setGreeting(await response.json())
    } catch(error) {
      console.log(error)
    }
  }

  return (
  <>
    <input type="text" value={input} onChange={blah} ></input>
    <span>{JSON.stringify(greeting)}</span>
  </>
  )
  async function blah(e) {
    console.log(e.target.value)
    await setInput(e.target.value);
    console.log(22222222222, input)
    await fetchGreeting();
  }

};

export default HelloWorld;
