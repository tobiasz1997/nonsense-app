import {
	AcademicCapIcon,
	BriefcaseIcon,
	DevicePhoneMobileIcon,
	FilmIcon,
	GiftIcon,
	LightBulbIcon,
	MusicalNoteIcon,
	PaintBrushIcon,
	ShoppingCartIcon,
	WrenchIcon
} from '@heroicons/react/24/outline';
import React, { FC, ReactElement } from 'react';
import { useGetActivity } from '@api/activity.api';

type Props = {};

const TasksIdea: FC<Props> = () => {
	const { data, isLoading } = useGetActivity();

	const getIcon = (type: string): ReactElement => {
		switch (type) {
			case 'education':
				return <AcademicCapIcon />;
			case 'recreational':
				return <PaintBrushIcon />;
			case 'social':
				return <DevicePhoneMobileIcon />;
			case 'diy':
				return <WrenchIcon />;
			case 'charity':
				return <GiftIcon />;
			case 'cooking':
				return <ShoppingCartIcon />;
			case 'relaxation':
				return <FilmIcon />;
			case 'music':
				return <MusicalNoteIcon />;
			case 'busywork':
				return <BriefcaseIcon />;
			default:
				return <LightBulbIcon />;
		}
	};

	return (
		<div className="space-y-4 rounded-2xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500">
			<div className="flex items-center justify-center space-x-2 text-orange">
				<h2 className="text-2xl font-bold">Idea</h2>
				<LightBulbIcon className="h-5 w-5 stroke-2" />
			</div>

			{isLoading ? (
				<div className="mx-auto max-w-xl space-y-4 ">
					<div className="h-6 w-full animate-pulse rounded bg-green-dark dark:bg-pistachio"></div>
					<div className="mx-auto flex max-w-sm items-center space-x-2">
						<div className="h-5 w-5 animate-pulse rounded bg-yellow"></div>
						<div className="h-5 w-full animate-pulse rounded bg-green-dark dark:bg-pistachio"></div>
					</div>
				</div>
			) : data ? (
				<div className="space-y-4">
					<p className="text-center text-xl font-bold text-green-dark dark:text-pistachio sm:text-3xl">
						{data.activity}
					</p>
					<div className="flex items-center justify-center space-x-2">
						{React.cloneElement(
							getIcon(data.type),
							{
								className: 'h-5 w-5 text-orange'
							},
							null
						)}
						<p className="text-green-dark dark:text-pistachio">
							Accessibility -&nbsp;
							<span className="font-bold">
								{String(data.accessibility * 100)}%
							</span>
						</p>
					</div>
				</div>
			) : (
				<p className="text-center text-green-dark">No ideas, sorry!</p>
			)}
		</div>
	);
};

export default TasksIdea;
