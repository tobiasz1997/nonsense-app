import React, { FC, PropsWithChildren } from 'react';

type Props = {
	title: string;
};

const AlgorithmBox: FC<PropsWithChildren & Props> = (props) => {
	return (
		<section className="space-y-5 rounded-xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500">
			<h2 className="text-xl font-bold text-orange sm:text-3xl">
				{props.title}
			</h2>
			{props.children}
		</section>
	);
};

export default AlgorithmBox;
