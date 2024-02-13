import { RouteType } from '@interfaces/routeType';

export const appRoutes = {
	home: {
		title: `Home`,
		path: '/'
	} as RouteType,
	tasks: {
		title: 'Tasks',
		path: '/tasks'
	} as RouteType,
	algorithms: {
		title: 'Algorithms',
		path: '/algorithms'
	} as RouteType,
	users: {
		title: 'Users',
		path: '/users'
	} as RouteType,
	generators: {
		title: 'Generators',
		path: '/generators'
	} as RouteType
};
