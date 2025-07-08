import { Routes, Route, Outlet } from 'react-router';
import Explorer from './features/explorer';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Explorer />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
