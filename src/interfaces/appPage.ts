import { LayoutType } from '@interfaces/layoutType';
import { NextPage } from 'next';

export type AppPage<P = {}> = NextPage<P> & {
	layoutType?: LayoutType;
};
