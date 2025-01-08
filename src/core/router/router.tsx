import { PathConstants, RouteConstants, RouteTitles } from '@constants';
import { Home } from '@pages/home';
import { NotAuthorized } from '@pages/not-authtorized';
import { NotFound } from '@pages/not-found';
import { Start } from '@pages/start';
import { VerifyEmail } from '@pages/verify-email';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Route } from './route.model';

export const routes: Route[] = [
  new Route({
    key: RouteConstants.ROOT,
    path: PathConstants.ROOT,
    element: <Start />,
    errorElement: <NotFound />,
  }),
  new Route({
    key: RouteConstants.HOME,
    path: PathConstants.HOME,
    element: <Home />,
    title: RouteTitles.HOME,
  }),
  new Route({
    key: RouteConstants.VERIFY_EMAIL,
    path: PathConstants.VERIFY_EMAIL,
    element: <VerifyEmail />,
  }),
  new Route({
    key: RouteConstants.NOT_AUTHORIZED,
    path: PathConstants.NOT_AUTHORIZED,
    element: <NotAuthorized />,
  }),
];

export function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
