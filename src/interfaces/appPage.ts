import { NextPage } from 'next';
import { LayoutType } from '@interfaces/layoutType';

export type AppPage<P = {}> = NextPage<P> & {
	layoutType?: LayoutType;
};
