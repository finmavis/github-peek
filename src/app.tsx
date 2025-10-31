import { Routes, Route, Outlet } from 'react-router';
import Home from './pages/home/home';
import Search from './pages/search/search';
import NotFound from './pages/not-found/not-found';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
