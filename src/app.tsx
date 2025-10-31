import { Routes, Route, Outlet } from 'react-router';
import Home from './pages/home/home';
import Search from './pages/search/search';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
