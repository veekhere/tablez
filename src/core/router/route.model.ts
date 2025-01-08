import { ObjectUtils } from '@utils/object.utils';
import { RecursivePartial } from '@utils/type.utils';
import { ReactNode } from 'react';
import { NonIndexRouteObject } from 'react-router-dom';

export class Route implements NonIndexRouteObject {

  key: string = null;

  path: string = null;

  title: string = null;

  element: ReactNode = null;

  errorElement: ReactNode = null;

  children: Route[] = [];

  constructor(route: RecursivePartial<Route> = null) {
    if (!route) {
      return;
    }

    ObjectUtils.constructorFiller(this, route);
    this.children = route.children?.map((child) => new Route(child));
  }
} 
