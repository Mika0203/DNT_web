import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import MasterLayout from '../styles/MasterLayout';
import {RouterConfig} from './router.config';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route index element={<Navigate to='list' />} />
          {RouterConfig.map((page) => (
            <Route key={page.route} path={page.route} element={page.page} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
