import { createBrowserRouter, Navigate } from 'react-router-dom';

import Landing from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Navigate to='/characters?page=1' replace /> },
      { path: 'characters', element: <Landing /> },
    ],
  },
]);
