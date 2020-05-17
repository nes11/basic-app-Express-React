import React, { useState, useEffect } from 'react';

const StarWars = () => {
  const [ result, setResult ] = useState();
  const [ url , setUrl ] = useState('https://swapi.dev/api/films/1/');
  const [ handshake, setHandshake ] = useState();

  useEffect(() => {
    fetchStarWars();
  }, []);

  const fetchStarWars = async() => {
    try {
      const response = await fetch(url);
      setResult(await response.json());
    } catch(error) {
      console.log(error)
    }
  }

  const nudgeBackend = async() => {
    try {
      const response = await fetch('/hello');
      setHandshake(await response.text())
    } catch(error) {
      console.log(error)
    }
  }

  return (
  <>
    <button onClick={getBackendHandshake}>get handshake</button>
    <p>{handshake}</p>
    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}></input>
    <button onClick={getJson}>fetch</button>
    <span>{JSON.stringify(result)}</span>
  </>
  )
  async function getJson(e) {
    await fetchStarWars();
  }

  async function getBackendHandshake() {
    await nudgeBackend();
  }
};

export default StarWars;

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
