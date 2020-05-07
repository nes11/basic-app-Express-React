import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
  const [ greeting, setGreeting ] = useState();
  const [ input , setInput ] = useState('https://swapi.dev/api/films/1/');
  // const [ input , setInput ] = useState();

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async() => {
    try {
      const response = await fetch(input);
      console.log(999999, response)
      setGreeting(await response.json());
    } catch(error) {
      console.log(error)
    }
  }

  return (
  <>
    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
    <button onClick={getJson}>fetch</button>
    <span>{JSON.stringify(greeting)}</span>
  </>
  )
  async function getJson(e) {
    await fetchGreeting();
  }

};

export default HelloWorld;

// const Loader = ({ url, component }) => {
//   const [ data, setData ] = useState()
//   useEffect(() => {
//     fetch(url).then(res => res.json()).then(data => setData(data));
//   }, [])
//   return data ? component({ data }) : <div>NO DATA YET</div>
// }

// const HelloWorld = () => (
//   <Loader
//     url='https://swapi.dev/api/films/2/'
//     component={({ data }) => <span>{JSON.stringify(data)}</span>}
//   />
// )
