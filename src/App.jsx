import { useState, useEffect, use } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('');

  function handleClick(event) {
    setColor(event.detail.color);
    setCount((c) => c + 1);
  }

  useEffect(() => {
    document.addEventListener('onCubeClicked', handleClick);

    return () => {
      document.removeEventListener('onCubeClicked', handleClick);
    };
  }, []);

  return (
    <>
      {count>0?`Clicked Count:${count} Last Color: #${color}`:`Click the cube!`}
    </>
  )
}

export default App
