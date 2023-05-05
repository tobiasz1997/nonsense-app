import { RouteType } from '@interfaces/routeType';

export type NavLinksType = Array<Required<RouteType & { icon: JSX.Element }>>;
