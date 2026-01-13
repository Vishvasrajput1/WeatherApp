import { Route, Routes } from 'react-router';
import './App.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
