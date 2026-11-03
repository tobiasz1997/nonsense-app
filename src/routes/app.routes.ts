import { RouteType } from '@interfaces/routeType';

export const appRoutes = {
	home: {
		title: `home`,
		path: '/'
	} as RouteType,
	tasks: {
		title: 'tasks',
		path: '/tasks'
	} as RouteType,
	algorithms: {
		title: 'algorithms',
		path: '/algorithms'
	} as RouteType,
	users: {
		title: 'users',
		path: '/users'
	} as RouteType,
	generators: {
		title: 'generators',
		path: '/generators'
	} as RouteType,
	blackjack: {
		title: 'blackjack',
		path: '/blackjack'
	} as RouteType,
	schedule: {
		title: 'schedule',
		path: '/schedule'
	} as RouteType,
	pickerWheel: {
		title: 'pickerWheel',
		path: '/picker-wheel'
	} as RouteType
};
