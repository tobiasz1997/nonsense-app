import { RouteType } from '@interfaces/routeType';
import React from "react";

export type NavLinksType = Array<Required<RouteType & { icon: React.JSX.Element }>>;
