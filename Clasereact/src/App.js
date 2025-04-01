import { useNavigate } from 'react-router-dom';
import './App.css';
import Menu from './page/base/Menu';
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

  

  return (
    <Menu />
  );
}

export default App;
