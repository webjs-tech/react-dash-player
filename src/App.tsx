import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Demo from '../components/Demo/Demo';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Demo />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
